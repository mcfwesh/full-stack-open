const info = (...params) =>
  process.env.NODE_ENV !== "test" && console.log(...params);

module.exports = { info };