const express = require('express');
const router = express.Router();
const enumsController = require('../controllers/enums.controller');

// routes for enums types
router.get('/kanban', enumsController.getAllKanban); // get all kanban categories 
router.get('/priority', enumsController.getAllPriority); // get all priority values

module.exports = router;