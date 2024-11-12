// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DetalhesAr from './pages/DetalhesAr';
import DetalhesUmidade from './pages/DetalhesUmidade';
import DetalhesTemperatura from './pages/DetalhesTemperatura';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detalhes-ar" element={<DetalhesAr />} />
        <Route path="/detalhes-umidade" element={<DetalhesUmidade />} />
        <Route path="/detalhes-temperatura" element={<DetalhesTemperatura />} />
      </Routes>
    </Router>
  );
};

export default App;
