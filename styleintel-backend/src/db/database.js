const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  path.resolve(__dirname, 'database.db'),
  (err) => {
    if (err) {
      console.error('Error DB:', err);
    } else {
      console.log('SQLite conectado');
    }
  }
);

module.exports = db;