require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// MIDDLEWARE (OBLIGATORIO para Thunder Client POST)
app.use(cors());
app.use(express.json());

// DB init
const { createTable } = require('./src/models/outfitModel');
createTable();



// rutas
const outfitRoutes = require('./src/routes/outfitRoutes');
app.use('/api/outfits', outfitRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

