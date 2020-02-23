const { check, validationResult } = require('express-validator');
const { BringError } = require('../util/error_handler.js')
const HttpStatus = require('http-status-codes');

module.exports = (app) => {
  const records_controller = require('../controllers/records.js');
  /**
 * @api {post} /records/bring Bring Records
 * @apiName BringRecords
 * @apiGroup Records
 * @apiVersion 1.0.0
 *
 * @apiParam {String} startDate Records created after.
 * @apiParam {String} endDate Records created before.
 * @apiParam {Number} minCount Records with minimum sum counts.
 * @apiParam {Number} maxCount Records with maximum sum counts.
 * @apiParamExample {json} Request-Example:
 *    {
 *      "startDate": "2016-01-26",
 *      "endDate": "2018-02-02",
 *      "minCount": 2700,
 *      "maxCount": 3000
 *    }
 *
 *
 * @apiSuccess {String} code Success code 0.
 * @apiSuccess {String} msg  Success.
 * @apiSuccess {Array} records  Records list.
 * @apiSuccess {String} records.key  Record key.
 * @apiSuccess {DateTime} records.createdAt  Record created datetime.
 * @apiSuccess {Number} records.totalCount  Sum of record's counts.
 *
 * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "code": 0,
   *      "msg": "Success",
   *      "records": [
   *        {
   *            "key": "xqT9N0XwJ4qwU0GQ",
   *            "createdAt": "2016-07-06T06:54:46.169Z",
   *            "totalCount": 2700
   *        },
   *        {
   *            "key": "NMBUu74JC1bEGECM",
   *            "createdAt": "2016-07-06T13:12:01.175Z",
   *            "totalCount": 2800
   *        },
   *       ]
   *     }
 *
 * @apiError (Custom Errors) {Object} DBError Database Error.
 *
 * @apiErrorExample DBError-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 1,
 *         "msg": "An error occured on database connection."
 *     }

 * @apiError {Object} ParameterError Unexpected parameter type or value.
 *
 * @apiErrorExample ParameterError-Response:
 *     HTTP/1.1 400 Bad Request
 *      {
 *        "code": 400,
 *        "msg": {
 *          "maxCount": "Invalid value"
 *        }
 *     }
 */
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
