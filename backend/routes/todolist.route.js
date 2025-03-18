const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolist.controller');

router.post('/', todolistController.createNewList);
router.get('/', todolistController.readAllLists);
router.get('/:tdlid', todolistController.readOneList);
router.put('/:tdlid', todolistController.updateList);
router.delete('/:tdlid', todolistController.deleteList);

module.exports = router;