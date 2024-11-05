const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Rota para registrar um novo usuário
router.post('/register', userController.register);

// Rota para fazer login
router.post('/login', userController.login);

module.exports = router;
