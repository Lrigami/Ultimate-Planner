const express = require('express');
const router = express.Router();
const todolistController = require('../controllers/todolist.controller');

// To-do lists routes
router.post('/', todolistController.createNewList); // Create a new to-do list in db
router.get('/', todolistController.readAllLists); // Get all to-do lists of a given user
router.get('/:tdlid', todolistController.readOneList); // Get a signe to-do list by id
router.put('/:tdlid', todolistController.updateList); // Update one to-do list data
router.delete('/:tdlid', todolistController.deleteList); // Delete one to-do list by id (delete all associated tasks)
router.get('/:tdlid/total', todolistController.countTasks); // Count all tasks in a given to-do list
router.get('/:tdlid/done', todolistController.countDoneTasks); // Count all done tasks in a given to-do list
router.post('/sortOrder', todolistController.sortTodolistOrder); // Update to-do list sorting order after user's drag'n drop
router.post('/pinned', todolistController.getPinnedLists); // Get all pinned lists of a given user

module.exports = router;