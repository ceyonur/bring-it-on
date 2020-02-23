const MongoClient = require ('mongodb').MongoClient;
require('dotenv').config()

//This module meant to be used as a singleton-connection manager.
var state = {
  db: null,
  client: null
};

module.exports = {
  // connect and save the state for db and client
  connect: (done) => {
    if (state.db) return done ();

    MongoClient.connect (process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        const db = client.db(process.env.DATABASE_NAME);
        state.db = db;
        state.client = client
        done ();
      });
  },
  // return saved state of db
  getDb: () => {
    return state.db;
  },

  // close connection to server and reset current state 
  close: (done) => {
    if (state.db) {
      state.client.close ((err, res) => {
        state.db = null;
        state.client = null;
        done (err);
      });
    }
  }
};
