// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/v1/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Redireciona para o dashboard se o login for bem-sucedido
        navigate('/dashboard');
      }
    } catch (error) {
      // Exibe mensagem de erro se o login falhar
      if (error.response && error.response.status === 401) {
        setErrorMessage('Senha incorreta!');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Usuário não encontrado!');
      } else {
        setErrorMessage('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
