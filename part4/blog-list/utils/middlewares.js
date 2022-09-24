const { info } = require("../utils/logger.js");
const jwt = require("jsonwebtoken");

const errorHandler = (error, req, res, next) => {
  if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "token missing or invalid" });
  }
  if (error) {
    res.status(400).json({ error: "Bad Request" });
  }
  info(error);
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = (request, response, next) => {
  const decodeJwt = jwt.verify(request.token, process.env.SECRET);
  request.user = decodeJwt.username;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
