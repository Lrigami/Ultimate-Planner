const express = require('express');
const router = express.Router();
const kanbanController = require('../controllers/kanban.controller');

router.get('/', kanbanController.getAllKanban);

module.exports = router;