const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { protect } =require('../middleware/authMiddleware')
router.post('/', AuthController.handleRegister);
router.post('/login', AuthController.handleLogin);
router.get('/data', protect, AuthController.getUserData);

module.exports = router;