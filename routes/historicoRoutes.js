const express = require('express');
const router = express.Router();

const historicoController = require('../controllers/historicoController');

router.get('/', historicoController.getHistorico);

module.exports = router