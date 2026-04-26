const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./styleintel.db');

db.run(`
  CREATE TABLE IF NOT EXISTS trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    growth INTEGER,
    date TEXT
  )
`);

db.run(`
  INSERT INTO trends (name, category, growth, date)
  VALUES
  ('Korean oversized blazer', 'streetwear', 25, '2026-04-25'),
  ('Japanese minimal outfit', 'minimal', 18, '2026-04-25'),
  ('Streetwear baggy jeans', 'streetwear', 30, '2026-04-25')
`);
db.run(`
  INSERT INTO trends (name, category, growth, date)
  VALUES ('Test trend manual', 'test', 10, '2026-04-26')
`);

app.get('/', (req, res) => {
  res.send('StyleIntel API funcionando 🚀');
});
app.get('/trends', (req, res) => {
  db.all('SELECT * FROM trends', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/trends', (req, res) => {
  const { name, category, growth, date } = req.body;

  const query = `
    INSERT INTO trends (name, category, growth, date)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [name, category, growth, date], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      id: this.lastID,
      name,
      category,
      growth,
      date
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});