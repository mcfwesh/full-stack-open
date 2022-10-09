const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const { info } = require("./utils/logger");
const middlewares = require("./utils/middlewares");
const mongoose = require("mongoose");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => info("Connected"))
  .catch((error) => info(error));

app.use(cors());
app.use(express.json());
app.use(middlewares.tokenExtractor);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/test");
  app.use("/api/testing", testRouter);
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middlewares.errorHandler);

module.exports = app;
