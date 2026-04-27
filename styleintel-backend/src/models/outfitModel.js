const db = require('../db/database');

const createTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS outfits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image_url TEXT,
      style TEXT,
      tags TEXT,
      affiliate_link TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

module.exports = { createTable };