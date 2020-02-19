// Read env variables
require('dotenv').config()
// Configuring the database
const mongo = require('mongodb').MongoClient

class Connection {
  static connectMongo() {
    // Connecting to the database
    if (this.client) return Promise.resolve(this.client)
    mongo.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((client) => {
      this.client = client;
      console.log("Successfully connected to the database");
    }).catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
    });
  }
}


Connection.client = null;

module.exports = { Connection };
