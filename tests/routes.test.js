let request = require('supertest')
let app = require('../app.js')
const HttpStatus = require('http-status-codes');
let mongoUtil = require( '../util/mongo_util' );
const { ErrorEnum } = require('../util/error_handler')

require('../node_modules/iconv-lite').encodingExists('foo');

describe('Sample Test', () => {
  test('should test that true === true', () => {
    return expect(true).toBe(true)
  })
});

describe('Route Tests', () => {
  test('should get hello world', () => {
    request(app).post('/').then(res => {
      expect(res.statusCode).toEqual(HttpStatus.OK);
      expect(res.body.msg).toEqual("Success");
      expect(res.body.result).toEqual("Hello World!");
    });
  })

    test('should get 404 for get', () => {
      request(app).get('/').then(res => {
        expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(res.body.code).toEqual(HttpStatus.NOT_FOUND);
      });
    })
});


describe('Record Route Tests', () => {
  afterAll (async done => {
    await mongoUtil.close (() => done());
  });

  beforeAll (done => {
    mongoUtil.connect (err => {
      if (err) {
        console.log ('Unable to connect', err);
        process.exit (1);
      }else{
        console.log('Succesfully connected');
        done();
      }
    });
  });

  test('should get bad request for empty values', async () => {
    await request(app).post('/records/bring').send({}).then(res => {
      expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(res.body.code).toEqual(HttpStatus.BAD_REQUEST);
      expect(res.body.msg.minCount).toEqual("Invalid value");
      expect(res.body.msg.maxCount).toEqual("Invalid value");
      expect(res.body.msg.startDate).toEqual("Invalid value");
      expect(res.body.msg.endDate).toEqual("Invalid value");
    });
  })

  test('should get bad request for wrong values', async () => {
    await request(app).post('/records/bring').send({minCount: "asd"}).then(res => {
      expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      expect(res.body.code).toEqual(HttpStatus.BAD_REQUEST);
      expect(res.body.msg.minCount).toEqual("Invalid value");
    });
  })

  test('should get record', async () => {
    const params = {
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000
    }
    await request(app).post('/records/bring').send(params).then(res => {
      expect(res.statusCode).toEqual(HttpStatus.OK);
      expect(res.body.code).toEqual(ErrorEnum.SUCCESS);
      expect(res.body.records).toBeInstanceOf(Array);
      res.body.records.forEach((record) => {
        expect(record.totalCount).toBeLessThanOrEqual(params.maxCount);
        expect(record.totalCount).toBeGreaterThanOrEqual(params.minCount);
        expect(Date.parse(record.createdAt)).toBeLessThanOrEqual(Date.parse(params.endDate));
        expect(Date.parse(record.createdAt)).toBeGreaterThanOrEqual(Date.parse(params.startDate));
      })
    })
  })
});
