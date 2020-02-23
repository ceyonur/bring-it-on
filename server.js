var app = require('./app');
var mongoUtil = require( './util/mongo_util' );

// connect to mongo server and listen
mongoUtil.connect((err,client) => {
  if (err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
  console.log("Successfully connected to the database");
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
});
