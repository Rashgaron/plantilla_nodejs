const express = require('express');
const router = express.Router();
const FactoryController = require('../factory/factoryController');

const postController = FactoryController.createPostController();

router.get('/', postController.getAllFromUser);
router.post('/', postController.create);
router.get('/', postController.getAll);

module.exports = router;