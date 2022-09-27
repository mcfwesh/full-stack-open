const testRouter = require("express").Router();
const BlogUser = require("../models/users");
const Blog = require("../models/blogs");

testRouter.post("/reset", async (req, res) => {
  await BlogUser.deleteMany({});
  await Blog.deleteMany({});

  res.status(204).end();
});

module.exports = testRouter;
