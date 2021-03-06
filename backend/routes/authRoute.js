const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/signup', AuthController.handleRegister);
router.post('/login', AuthController.handleLogin);
router.get('/logout', AuthController.handleLogout)

module.exports = router;