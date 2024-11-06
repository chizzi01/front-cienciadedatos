import React, { useState, useEffect } from 'react';
import { Pie, Bar, Bubble, Scatter } from 'react-chartjs-2';
import { getDiabetesHistory, getHeartDiseaseHistory } from '../controllers/chart';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement
} from 'chart.js';

ChartJS.register(Tooltip, Legend, Title, ArcElement, CategoryScale, LinearScale, BarElement, PointElement);

const Dashboard = () => {
  const [diabetesData, setDiabetesData] = useState(null);
  const [heartDiseaseData, setHeartDiseaseData] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [bmiData, setBmiData] = useState(null);
  const [cholesterolData, setCholesterolData] = useState(null);
  const [activityData, setActivityData] = useState(null);

  // GRAFICOS MEDICOS
  const [ageVsBmi, setAgeVsBmi] = useState(null);
  const [probabilityVsAge, setProbabilityVsAge] = useState(null);
  const [bloodGlucoseVsHbA1c, setBloodGlucoseVsHbA1c] = useState(null);
  const [bmiVsHeartProbability, setBmiVsHeartProbability] = useState(null);

  useEffect(() => {
    // Llamada a la API para datos de diabetes
    getDiabetesHistory().then((data) => {
      const diabetesCount = {
        withDiabetes: data.filter(item => item.resultado === 'positivo').length,
        withoutDiabetes: data.filter(item => item.resultado === 'negativo').length,
      };

      // Configuración de datos para el gráfico de diabetes
      setDiabetesData({
        labels: ['Con Diabetes', 'Sin Diabetes'],
        datasets: [{
          label: 'Estado de Diabetes',
          data: [diabetesCount.withDiabetes, diabetesCount.withoutDiabetes],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      });

      // Procesamiento de datos de edad para el gráfico de diabetes por edad
      const ageGroups = [0, 0, 0, 0, 0, 0];
      data.forEach(item => {
        const age = item.Age;
        if (age <= 24) ageGroups[0]++;
        else if (age <= 34) ageGroups[1]++;
        else if (age <= 44) ageGroups[2]++;
        else if (age <= 54) ageGroups[3]++;
        else if (age <= 64) ageGroups[4]++;
        else ageGroups[5]++;
      });

      setAgeData({
        labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [{
          label: 'Cantidad de Personas con Diabetes por Edad',
          data: ageGroups,
          backgroundColor: '#FFCE56',
        }]
      });


      // GRAFICOS MEDICOS
      // Relación Edad vs. BMI (Scatter)
      const ageBmiData = data.map(item => ({ x: item.Age, y: item.BMI }));
      setAgeVsBmi({
        datasets: [{
          label: 'Edad vs. BMI',
          data: ageBmiData,
          backgroundColor: '#36A2EB',
        }]
      });

      // Relación Probabilidad de Diabetes vs. Edad (Bubble)
      const probabilityAgeData = data.map(item => ({
        x: item.Age,
        y: item.probabilidad,
        r: item.probabilidad * 10  // Ajuste de tamaño de burbuja según probabilidad
      }));
      setProbabilityVsAge({
        datasets: [{
          label: 'Probabilidad de Diabetes vs. Edad',
          data: probabilityAgeData,
          backgroundColor: '#FF6384',
        }]
      });
    });

    // Llamada a la API para datos de enfermedades cardíacas
    getHeartDiseaseHistory().then((data) => {
      const heartDiseaseCount = {
        withHeartDisease: data.filter(item => item.probabilidad >= 0.5).length,
        withoutHeartDisease: data.filter(item => item.probabilidad < 0.5).length,
      };

      // Configuración de datos para el gráfico de enfermedades cardíacas
      setHeartDiseaseData({
        labels: ['Con Enfermedades Cardiacas', 'Sin Enfermedades Cardiacas'],
        datasets: [{
          label: 'Predicción de Enfermedades Cardiacas',
          data: [heartDiseaseCount.withHeartDisease, heartDiseaseCount.withoutHeartDisease],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      });



      const cholesterolGroups = [0, 0, 0];
      data.forEach(item => {
        const cholesterol = item.Colesterol;
        if (cholesterol < 200) cholesterolGroups[0]++;
        else if (cholesterol < 240) cholesterolGroups[1]++;
        else cholesterolGroups[2]++;
      });

      setCholesterolData({
        labels: ['Bajo', 'Normal', 'Alto'],
        datasets: [{
          label: 'Distribución del Colesterol',
          data: cholesterolGroups,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      });


      // GRAFICOS MEDICOS
      // Procesamiento de datos de IMC para el gráfico de distribución del IMC
      const bmiGroups = [0, 0, 0, 0];
      data.forEach(item => {
        const bmi = item.BMI;
        if (bmi < 18.5) bmiGroups[0]++;
        else if (bmi < 25) bmiGroups[1]++;
        else if (bmi < 30) bmiGroups[2]++;
        else bmiGroups[3]++;
      });

      setBmiData({
        labels: ['Bajo Peso', 'Peso Normal', 'Sobrepeso', 'Obesidad'],
        datasets: [{
          label: 'Distribución del IMC',
          data: bmiGroups,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }]
      });

      // Relación Glucosa vs. HbA1c (Scatter)
      const glucoseHbA1cData = data.map(item => ({
        x: item.BloodGlucoseLevel,
        y: item.HbA1cLevel
      }));
      setBloodGlucoseVsHbA1c({
        datasets: [{
          label: 'Nivel de Glucosa vs. HbA1c',
          data: glucoseHbA1cData,
          backgroundColor: '#4BC0C0',
        }]
      });

      // Relación BMI vs. Probabilidad de Enfermedad Cardíaca (Bubble)
      const bmiHeartProbData = data.map(item => ({
        x: item.BMI,
        y: item.probabilidad,
        r: item.probabilidad * 10  // Ajuste de tamaño de burbuja según probabilidad
      }));
      setBmiVsHeartProbability({
        datasets: [{
          label: 'BMI vs. Probabilidad de Enfermedad Cardíaca',
          data: bmiHeartProbData,
          backgroundColor: '#FFCE56',
        }]
      });

    });
  }, []);

 

   return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Salud</h1>
      <div className="charts-container">
        <div className="chart-card">
          <h3>Estado de Diabetes</h3>
          {diabetesData ? <Pie data={diabetesData} style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Cantidad de Personas con Diabetes por Edad</h3>
          {ageData ? <Bar data={ageData} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Predicción de Enfermedades Cardiacas</h3>
          {heartDiseaseData ? <Bar data={heartDiseaseData} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Distribución del Colesterol</h3>
          {cholesterolData ? <Bar data={cholesterolData} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Distribución del IMC</h3>
          {bmiData ? <Bar data={bmiData} /> : <p>Cargando datos...</p>}
        </div>
        
        {/* GRAFICOS MEDICOS */}
        <div className="chart-card">
          <h3>Edad vs. BMI</h3>
          {ageVsBmi ? <Scatter data={ageVsBmi} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Probabilidad de Diabetes vs. Edad</h3>
          {probabilityVsAge ? <Bubble data={probabilityVsAge} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Nivel de Glucosa vs. HbA1c</h3>
          {bloodGlucoseVsHbA1c ? <Scatter data={bloodGlucoseVsHbA1c} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>BMI vs. Probabilidad de Enfermedad Cardíaca</h3>
          {bmiVsHeartProbability ? <Bubble data={bmiVsHeartProbability} /> : <p>Cargando datos...</p>}
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
