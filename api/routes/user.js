const express = require('express');
const router = express.Router();
const FactoryController = require('../factory/factoryController');

const userController = FactoryController.createUserController();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.post('/:id', userController.delete);

module.exports = router;