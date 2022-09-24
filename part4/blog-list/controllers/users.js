const usersRoute = require("express").Router();
const bcrypt = require("bcrypt");
const BlogUser = require("../models/users");

usersRoute.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  const existingUser = await BlogUser.findOne({ username });

  if (existingUser || password.length < 3) {
    return response.status(400).json({ error: "invalid username or password" });
  }

  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = new BlogUser({
    name,
    username,
    password: passwordHash,
  });
  const result = await user.save();
  response.status(201).json(result);
});

usersRoute.get("/", async (request, response) => {
  const users = await BlogUser.find({}).populate("blog", { user: 0 });
  response.status(200).json(users);
});
module.exports = usersRoute;
