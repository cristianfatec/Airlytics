// src/pages/Dashboard.js
import '../styles/Dashboard.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [reading, setReading] = useState(null);
  const [airQuality, setAirQuality] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostRecentReading = async () => {
      try {
        const response = await axios.get('http://localhost:5000/readings/most-recent');
        setReading(response.data);

        const { humidity, temperature } = response.data;
        if (humidity < 30 || temperature > 35) {
          setAirQuality('Ruim');
        } else if (humidity >= 30 && humidity <= 60 && temperature >= 20 && temperature <= 30) {
          setAirQuality('Boa');
        } else {
          setAirQuality('Normal');
        }
      } catch (error) {
        console.error('Erro ao obter a leitura mais recente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostRecentReading();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="background-image">
        <div className="dashboard-box">
          <h1>Dashboard</h1>
          {loading ? (
            <p>Carregando dados...</p>
          ) : (
            <div className="info-boxes">
              <div className="info-box air-quality">
                <h3>Qualidade do Ar</h3>
                <p className="data">{airQuality}</p>
                <button onClick={() => navigate('/detalhes-ar')} className="details-button">+ Detalhes</button>
              </div>
              <div className="info-box humidity">
                <h3>Umidade</h3>
                <p className="data">{reading.humidity}%</p>
                <button onClick={() => navigate('/detalhes-umidade')} className="details-button">+ Detalhes</button>
              </div>
              <div className="info-box temperature">
                <h3>Temperatura</h3>
                <p className="data">{reading.temperature}°C</p>
                <button onClick={() => navigate('/detalhes-temperatura')} className="details-button">+ Detalhes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
