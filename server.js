const express = require('express');
const bodyParser = require('body-parser');
const { Connection } = require('./lib/connection.js')

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

Connection.connectMongo();

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Hello World!"});
});

require('./routes/records.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
