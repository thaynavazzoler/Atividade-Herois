const express = require('express');
const router = express.Router();

const heroisController = require('../controllers/heroisController');

router.get('/', heroisController.getAllHerois);
router.post('/', heroisController.createHeroi);
router.put('/:id', heroisController.updateHeroi);
router.delete('/:id', heroisController.deleteHeroi);
router.get('/:id', heroisController.getHeroiById);
router.get('/nome/:nome', heroisController.getHeroisByNome);
router.get('/poder/:poder', heroisController.getHeroisByPoder);

module.exports = router;