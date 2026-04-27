const db = require('../db/database');

const createTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS outfits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image_url TEXT,
      style TEXT,
      tags TEXT,
      affiliate_link TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(query);
};

module.exports = { createTable };