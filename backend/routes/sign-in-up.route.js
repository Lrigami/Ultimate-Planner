const express = require('express');
const router = express.Router();
const authController = require('../controllers/sign-in-up.controller');

router.post('/', authController.createNewUser);
router.get('/:id', authController.getOneUser);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);

module.exports = router;