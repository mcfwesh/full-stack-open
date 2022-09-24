const { info } = require("../utils/logger.js");
const jwt = require("jsonwebtoken");

const errorHandler = (error, req, res, next) => {
  info(error);
  if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "token missing or invalid" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "CastError") {
    return res.status(400).json({
      error: "malformatted id",
    });
  }

  next(error);
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
  request.user = decodeJwt;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
