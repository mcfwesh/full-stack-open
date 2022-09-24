const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const BlogUser = require("../models/users");
const jwt = require("jsonwebtoken");
const middlewares = require("../utils/middlewares");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middlewares.userExtractor, async (request, response) => {
  const blog = new Blog(request.body);
  const user = await BlogUser.findById(request.body.user);

  const decodeJwt = jwt.verify(request.token, process.env.SECRET);
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const result = await blog.save();

  user.blog = user.blog.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete(
  "/:id",
  middlewares.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById({ _id: request.params.id });

    const decodeJwt = jwt.verify(request.token, process.env.SECRET);
    const userTokenId = decodeJwt.id;
    console.log(blog.user.toString() === userTokenId);

    if (!(blog.user.toString() === userTokenId)) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const newBlog = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(result);
});

module.exports = blogsRouter;
