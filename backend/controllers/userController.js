const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Valida se todos os campos obrigatórios foram fornecidos
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
};

// Fazer login do usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Valida se todos os campos obrigatórios foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Valida a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Retorna sucesso com informações mínimas do usuário
    res.status(200).json({ 
      message: 'Login realizado com sucesso!', 
      user: { id: user._id, username: user.username, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
};

// Atualizar dados do usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário.', error });
  }
};
