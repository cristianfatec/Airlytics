import React, { useEffect, useState } from 'react';
import "../styles/DetalhesTemperatura.css"
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DetalhesTemperatura = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperatura Média (°C)',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v1/readings');
        const readings = response.data;

        // Processa os dados para calcular a média diária dos últimos 30 dias
        const dailyAverages = {};
        readings.forEach((reading) => {
          const date = new Date(reading.timestamp).toLocaleDateString(); // Obtém apenas a data (sem hora)
          if (!dailyAverages[date]) {
            dailyAverages[date] = { sum: 0, count: 0 };
          }
          dailyAverages[date].sum += reading.temperature;
          dailyAverages[date].count += 1;
        });

        // Cria os arrays para o gráfico com as médias dos últimos 30 dias
        const last30Days = Object.keys(dailyAverages)
          .slice(-30) // Pega os últimos 30 dias
          .map((date) => ({
            date,
            avgTemperature: dailyAverages[date].sum / dailyAverages[date].count,
          }));

        setData({
          labels: last30Days.map((day) => day.date),
          datasets: [
            {
              label: 'Temperatura Média (°C)',
              data: last30Days.map((day) => day.avgTemperature),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados de temperatura:', error);
      }
    };

    fetchTemperatureData();
  }, []);

  return (
    <div>
      <h2>Temperatura Média dos Últimos 30 Dias</h2>
      <Line data={data} />
    </div>
  );
};

export default DetalhesTemperatura;
