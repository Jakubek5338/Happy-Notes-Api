const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const AuthController = require('../controllers/authControllers');

router.get('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me',verify, AuthController.token);

module.exports = router;