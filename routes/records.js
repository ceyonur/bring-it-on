const { check, validationResult } = require('express-validator');
const { BringError } = require('../util/error_handler.js')
const HttpStatus = require('http-status-codes');

module.exports = (app) => {
  const records_controller = require('../controllers/records.js');
  app.post('/records/bring', [
    check('minCount').isNumeric(),
    check('maxCount').isNumeric(),
    check('startDate').isISO8601(),
    check('endDate').isISO8601()
  ], validate, records_controller.bring);
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = {};
  errors.array().map(err => extractedErrors[err.param] = err.msg)
  // throw our custom error
  throw new BringError(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST, extractedErrors)
}
