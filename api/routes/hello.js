const express = require('express');
const router = express.Router();
const FactoryController = require('../factory/factoryController');

const helloController = FactoryController.createHelloController();
// api/hello

router.get('/', helloController.hello);


module.exports = router;