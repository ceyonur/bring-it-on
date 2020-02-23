var express = require('express');
var bodyParser = require('body-parser');
var { handleError, BringError, ErrorEnum } = require('./util/error_handler')
const HttpStatus = require('http-status-codes');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// serve doc files
app.use('/doc', express.static('doc'))

//get our routes
require('./routes/records.js')(app);

// define a simple route
app.post('/', (req, res) => {
  res.json({code:0, msg: "Success", result:"Hello World!"});
});

// no get request allowed
app.get('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    msg: "No route available."
  });
});

// default 404 for posts
app.post('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    msg: "No route available."
  });
});


//direct our custom errors in case of thrown error
app.use((err, req, res, next) => {
  handleError(err, res);
  next(err);
});

module.exports = app;
