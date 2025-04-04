const express = require('express');
const router = express.Router({ mergeParams: true});
const tagController = require('../controllers/tags.controller');

router.get('/', tagController.getAllTags);
router.post('/', tagController.createNewTag);
router.put('/:tagid', tagController.updateTag);
router.delete('/:tagid', tagController.deleteTag);
router.post('/assign', tagController.assignToTask);
router.post('/remove', tagController.removeFromTask);
router.post('/retreive', tagController.getTagFromTask);

module.exports = router;