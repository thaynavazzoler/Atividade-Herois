const express = require('express');
const router = express.Router();

const heroisController = require('../controllers/heroisController');

router.get('/', heroisController.getAllHerois);
router.post('/', heroisController.createHeroi);
router.put('/:id', heroisController.updateHeroi);
router.delete('/:id', heroisController.deleteHeroi);

module.exports = router;