const db = require('../db/database');

// obtener todos
const getAllOutfits = (req, res) => {
  const { style } = req.query;

  let query = 'SELECT * FROM outfits';
  let params = [];

  if (style) {
    query += ' WHERE style = ?';
    params.push(style);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// crear outfit
const createOutfit = (req, res) => {
  const { title, image_url, style, tags, affiliate_link } = req.body;

  const query = `
    INSERT INTO outfits (title, image_url, style, tags, affiliate_link)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [title, image_url, style, tags, affiliate_link], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      id: this.lastID,
      message: 'Outfit creado'
    });
  });
};

module.exports = {
  getAllOutfits,
  createOutfit
};