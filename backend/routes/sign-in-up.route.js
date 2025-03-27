const express = require('express');
const router = express.Router();
const authController = require('../controllers/sign-in-up.controller');

router.post('/', authController.createNewUser);
router.get('/:id', authController.getOneUser);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);
router.post('/login', authController.login);
router.post('/emailverif', authController.verifiyEmail);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetpassword/:token', authController.resetPassword);

module.exports = router;