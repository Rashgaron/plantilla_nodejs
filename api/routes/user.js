const express = require('express');
const router = express.Router();
const FactoryController = require('../factory/factoryController');
const auth = require('../middlewares/auth');

const userController = FactoryController.createUserController();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);

//the _id is informed by the auth middleware
router.put('/', auth, userController.delete);

module.exports = router;