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
  const userToken = request.user;

  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = new Blog({ ...request.body, user: userToken.id });
  const user = await BlogUser.findById(request.body.user);
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
    if (!blog) {
      return response;
    }

    if (!(blog.user.toString() === request.user.id)) {
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
