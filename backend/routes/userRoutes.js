const express = require('express');
const cors = require('cors');
const router = express.Router();
const userController = require('../controllers/userController');

router.use(
  cors({
    origin: '*',
  }),
);


// Rota para registrar um novo usuário
router.post('/register', userController.register);

// Rota para fazer login
router.post('/login', userController.login);

// Rota para atualizar dados do usuário (PUT)
router.put('/:id', userController.updateUser);

// Rota para excluir conta do usuário (DELETE)
router.delete('/:id', userController.deleteUser);

module.exports = router;
