const express = require('express');
const router = express.Router();
const authController = require('../controllers/sign-in-up.controller');

// User and authentication routes
router.post('/', authController.createNewUser); // Create a new user in db
router.get('/:id', authController.getOneUser); // Access a single user by id
router.put('/:id', authController.updateUser); // Update a user data
router.delete('/:id', authController.deleteUser); // Delete a single user by id (deleted all associated data)
router.post('/login', authController.login); // To accept login from a user
router.post('/emailverif', authController.verifiyEmail); // Verify is email already exists in db
router.post('/forgotpassword', authController.forgotPassword); // Generate a token for password reset
router.post('/resetpassword/:token', authController.resetPassword); // Update password in db after reset

module.exports = router;