const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notes.controller');

router.post('/', noteController.createNewNote);
router.get('/', noteController.getAllNotes);
router.put('/:noteid', noteController.updateNote);
router.delete('/:noteid', noteController.deleteNote);
router.post('/pinned', noteController.getAllPinnedNotes);
router.post('/sortOrder', noteController.updateNotesOrder);