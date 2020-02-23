var app = require('./app');
var mongoUtil = require( './util/mongo_util' );
const port = process.env.PORT || 8080

// connect to mongo server and listen

mongoUtil.connect((err,client) => {
  if (err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
  console.log("Successfully connected to the database");
  app.listen(port, () => {
    console.log("Server is listening on port "  + port);
  });
});
