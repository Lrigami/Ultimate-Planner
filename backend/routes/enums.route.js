const express = require('express');
const router = express.Router();
const enumsController = require('../controllers/enums.controller');

router.get('/kanban', enumsController.getAllKanban);
router.get('/priority', enumsController.getAllPriority);

module.exports = router;