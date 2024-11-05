import React from 'react';
import { Pie, Bar, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement, PointElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement, PointElement);

const Dashboard = () => {
  // Hardcoded data for the charts
  const diabetesData = {
    labels: ['Con Diabetes', 'Sin Diabetes'],
    datasets: [{
      label: 'Estado de Diabetes',
      data: [55, 45],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }]
  };

  const ageData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [{
      label: 'Cantidad de Personas con Diabetes por Edad',
      data: [5, 10, 15, 20, 25, 30],
      backgroundColor: '#FFCE56',
    }]
  };

  const hypertensionData = {
    labels: ['Con Hipertensión', 'Sin Hipertensión'],
    datasets: [{
      label: 'Predicción de Hipertensión',
      data: [40, 60],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }]
  };

  const heartDiseaseData = {
    labels: ['Con Enfermedades Cardiacas', 'Sin Enfermedades Cardiacas'],
    datasets: [{
      label: 'Predicción de Enfermedades Cardiacas',
      data: [30, 70],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }]
  };

  const bmiData = {
    labels: ['Bajo Peso', 'Peso Normal', 'Sobrepeso', 'Obesidad'],
    datasets: [{
      label: 'Distribución del IMC',
      data: [10, 50, 25, 15], 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
  };

  const bubbleData = {
    datasets: [{
      label: 'Relación Edad vs IMC con Tamaño de Burbujas',
      data: [
        { x: 25, y: 22.0, r: 10 },
        { x: 30, y: 27.5, r: 15 },
        { x: 35, y: 30.0, r: 20 },
        { x: 40, y: 32.5, r: 25 },
        { x: 45, y: 28.0, r: 10 },
        { x: 50, y: 26.0, r: 15 },
        { x: 55, y: 29.5, r: 20 },
        { x: 60, y: 31.0, r: 25 },
        { x: 65, y: 33.0, r: 30 },
        { x: 70, y: 34.5, r: 35 }
      ],
      backgroundColor: '#FF6384'
    }]
  };

  const bubbleOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Edad'
        }
      },
      y: {
        title: {
          display: true,
          text: 'IMC'
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Salud</h1>
      <div className="charts-container">
        <div className="chart-card">
          <h3>Estado de Diabetes</h3>
          <Pie data={diabetesData} style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }} />
        </div>
        <div className="chart-card">
          <h3>Cantidad de Personas con Diabetes por Edad</h3>
          <Bar data={ageData} />
        </div>
        <div className="chart-card">
          <h3>Predicción de Hipertensión</h3>
          <Bar data={hypertensionData} />
        </div>
        <div className="chart-card">
          <h3>Predicción de Enfermedades Cardiacas</h3>
          <Bar data={heartDiseaseData} />
        </div>
        <div className="chart-card">
          <h3>Distribución del IMC</h3>
          <Bar data={bmiData} />
        </div>
        <div className="chart-card">
          <h3>Relación Edad vs IMC con Tamaño de Burbujas</h3>
          <Bubble data={bubbleData} options={bubbleOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
