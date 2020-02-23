var mongoUtil = require('../util/mongo_util')
const { ErrorEnum, BringError } = require('../util/error_handler')
const HttpStatus = require('http-status-codes');
const collectionName = "records";

exports.bring = (req, res) => {
  let { startDate, endDate, minCount, maxCount} = req.body;
  let records = mongoUtil.getDb().collection(collectionName);
  var projection = {
    _id: 0, key: 1, createdAt: 1,
    totalCount: {
      $reduce: { input: '$counts', initialValue: 0, in: { $add: ['$$value', '$$this'] } }
    }
  }
  var matching = {
    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    totalCount: {
      $gte: minCount,
      $lte: maxCount
    }
  }
  records.aggregate([ { $project: projection }, { $match: matching } ])
    .sort({createdAt: 1})
    .toArray(function(err, docs){
      if (err){
        throw new BringError(HttpStatus.OK, ErrorEnum.DB_ERROR, err)
      }
      res.send({
        code: ErrorEnum.SUCCESS,
        msg: "Success",
        records: docs
      });
    })
  };
