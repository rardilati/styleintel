const express = require('express');
const router = express.Router();

const {
  getAllOutfits,
  createOutfit
} = require('../controllers/outfitController');

router.get('/', getAllOutfits);
router.post('/', createOutfit);

module.exports = router;