const logger = require("../config/logger.config");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  logger.error(err.message);

  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
