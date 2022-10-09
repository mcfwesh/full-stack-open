const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlogUser = require("../models/users");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await BlogUser.findOne({ username });

  const passwordHash =
    user === null ? false : await bcrypt.compare(password, user.password);
  if (!(user && passwordHash)) {
    return res.status(401).json({ error: "invalid username or password" });
  }
  const token = jwt.sign(
    { username: user.username, id: user.id },
    process.env.SECRET
  );
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
