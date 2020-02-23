const HttpStatus = require('http-status-codes');

// Custom Error handler
class BringError extends Error {
  constructor(statusCode, errorCode, message) {
    super();
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, errorCode, message } = err;
  console.log(err);
  res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: errorCode || HttpStatus.INTERNAL_SERVER_ERROR,
    msg: message || "INTERNAL_SERVER_ERROR"
  });
}

const ErrorEnum = {SUCCESS:0, DB_ERROR:1, SERVER_ERROR:2}

module.exports = {
  BringError,
  handleError,
  ErrorEnum
}
