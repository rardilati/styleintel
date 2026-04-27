require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// rutas
const outfitRoutes = require('./src/routes/outfitRoutes');
app.use('/api/outfits', outfitRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const { createTable } = require('./src/models/outfitModel');
createTable();