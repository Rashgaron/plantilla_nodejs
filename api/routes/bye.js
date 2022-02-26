const express = require('express');
const router = express.Router();
const ByeController = require('../controllers/byeController')

const byeController = new ByeController();

router.get('/', byeController.bye);

module.exports = router;