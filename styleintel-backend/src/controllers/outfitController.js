const db = require('../db/database');

// GET outfits
const getAllOutfits = (req, res) => {
  const { style } = req.query;

  let query = 'SELECT * FROM outfits';
  let params = [];

  if (style) {
    query += ' WHERE style = ?';
    params.push(style);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// POST outfit
const createOutfit = (req, res) => {
  const { title, image_url, style, tags, affiliate_link } = req.body;

  if (!title || !image_url || !style) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.run(
    `INSERT INTO outfits (title, image_url, style, tags, affiliate_link)
     VALUES (?, ?, ?, ?, ?)`,
    [title, image_url, style, tags, affiliate_link],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        message: 'Outfit creado correctamente'
      });
    }
  );
};

const getTrends = (req, res) => {
  const query = `
    SELECT style, COUNT(*) as total
    FROM outfits
    GROUP BY style
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // convertir a objeto tipo { korean: 3 }
    const result = {};
    rows.forEach(row => {
      result[row.style] = row.total;
    });

    res.json(result);
  });
};




module.exports = {
  getAllOutfits,
  createOutfit,
  getTrends
};

