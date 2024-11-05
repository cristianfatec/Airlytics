const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Registrar um novo usuário
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao registrar usuário', error });
  }
};

// Fazer login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta!' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};
