const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolist.controller');

router.post('/', todolistController.createNewList);
router.get('/', todolistController.readAllLists);
router.get('/:tdlid', todolistController.readOneList);
router.put('/:tdlid', todolistController.updateList);
router.delete('/:tdlid', todolistController.deleteList);
router.get('/:tdlid/total', todolistController.countTasks);
router.get('/:tdlid/done', todolistController.countDoneTasks);
router.post('/sortOrder', todolistController.sortTodolistOrder);
router.post('/pinned', todolistController.getPinnedLists);

module.exports = router;