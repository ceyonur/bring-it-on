// get singleton connection class
const { Connection } = require('../lib/connection.js')

exports.bring = (req, res) => {
  let { startDate, endDate, minCount, maxCount} = req.body;
  const records = Connection.client.db().collection('records');
  console.log(req.body)
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
  records.aggregate([ { $project: projection }, { $match: matching } ]).sort({createdAt: 1})
    .toArray(function(err, docs){
      if (err){
        return res.send({
          code: 1,
          msg: err.toString()
        });
      }
      if(docs.length == 0) {
        return res.send({
          code: 2,
          msg: "Record not found"
        });
      }
      res.send({
        code: 0,
        msg: "Success",
        records: docs
      });
    })
  };
