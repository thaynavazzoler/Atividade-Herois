const express = require('express');
const router = express.Router();
const batalhaController = require('../controllers/batalhaController');

router.get('/:idHeroi1/:idHeroi2', batalhaController.batalhar);

module.exports = router;
