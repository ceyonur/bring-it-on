module.exports = (app) => {
  const records_controller = require('../controllers/records.js');
  // Create a new Note
  app.post('/records/bring', records_controller.bring);
}
