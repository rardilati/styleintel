const express = require('express');
const router = express.Router();

const {
  getAllOutfits,
  createOutfit, 
  getTrends
} = require('../controllers/outfitController');



router.get('/', getAllOutfits);
router.post('/', createOutfit);
router.get('/trends', getTrends);

module.exports = router;