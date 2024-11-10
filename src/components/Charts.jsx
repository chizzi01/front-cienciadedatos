import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
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
  const [generalHealthData, setGeneralHealthData] = useState(null);
  const [highBPData, setHighBPData] = useState(null);
  const [doctorVisitData, setDoctorVisitData] = useState(null);
  const [highBPHeartDiseaseData, setHighBPHeartDiseaseData] = useState(null);

  useEffect(() => {
    getDiabetesHistory().then((data) => {
      const diabetesCount = {
        withDiabetes: data.filter(item => item.resultado === 'positivo').length,
        withoutDiabetes: data.filter(item => item.resultado === 'negativo').length,
      };

      setDiabetesData({
        labels: ['Con Diabetes', 'Sin Diabetes'],
        datasets: [{
          label: 'Estado de Diabetes',
          data: [diabetesCount.withDiabetes, diabetesCount.withoutDiabetes],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      });

      const ageGroups = [0, 0, 0, 0, 0, 0];
      data.forEach(item => {
        const age = item.Age;
        if (age === 1) ageGroups[0]++;
        else if (age === 2 || age === 3) ageGroups[1]++;
        else if (age === 4 || age === 5) ageGroups[2]++;
        else if (age === 6 || age === 7) ageGroups[3]++;
        else if (age === 8 || age === 9) ageGroups[4]++;
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

      const cholesterolGroups = [0, 0];
      data.forEach(item => {
        const cholesterol = item.HighChol;
        if (cholesterol == 0) cholesterolGroups[0]++;
        else cholesterolGroups[1]++;
      });

      setCholesterolData({
        labels: ['Normal', 'Alto'],
        datasets: [{
          label: 'Distribución del Colesterol',
          data: cholesterolGroups,
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      });

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

      const generalHealthGroups = [0, 0, 0, 0, 0];
      data.forEach(item => {
        const health = item.GenHlth;
        if (health === 1) generalHealthGroups[0]++;
        else if (health === 2) generalHealthGroups[1]++;
        else if (health === 3) generalHealthGroups[2]++;
        else if (health === 4) generalHealthGroups[3]++;
        else generalHealthGroups[4]++;
      });

      setGeneralHealthData({
        labels: ['Excelente', 'Muy Buena', 'Buena', 'Regular', 'Mala'],
        datasets: [{
          label: 'Distribución de la Salud General',
          data: generalHealthGroups,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
      });

      const highBPGroups = [0, 0];
      data.forEach(item => {
        const highBP = item.HighBP;
        if (highBP == 0) highBPGroups[0]++;
        else highBPGroups[1]++;
      });

      setHighBPData({
        labels: ['No', 'Sí'],
        datasets: [{
          label: 'Distribución de la Presión Arterial Alta',
          data: highBPGroups,
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      });

      const doctorVisitGroups = {
        withDiabetes: [0, 0],
        withoutDiabetes: [0, 0]
      };
      data.forEach(item => {
        const wentToDoctor = item.ultimo_ano_al_medico;
        if (item.resultado === 'positivo') {
          if (wentToDoctor == 1) doctorVisitGroups.withDiabetes[0]++;
          else doctorVisitGroups.withDiabetes[1]++;
        } else {
          if (wentToDoctor == 1) doctorVisitGroups.withoutDiabetes[0]++;
          else doctorVisitGroups.withoutDiabetes[1]++;
        }
      });

      setDoctorVisitData({
        labels: ['Fueron al Médico', 'No Fueron al Médico'],
        datasets: [
          {
            label: 'Con Diabetes',
            data: doctorVisitGroups.withDiabetes,
            backgroundColor: '#FF6384',
          },
          {
            label: 'Sin Diabetes',
            data: doctorVisitGroups.withoutDiabetes,
            backgroundColor: '#36A2EB',
          }
        ]
      });

    });

    getHeartDiseaseHistory().then((data) => {
      const heartDiseaseCount = {
        withHeartDisease: data.filter(item => item.probabilidad >= 0.5).length,
        withoutHeartDisease: data.filter(item => item.probabilidad < 0.5).length,
      };

      setHeartDiseaseData({
        labels: ['Con Enfermedades Cardiacas', 'Sin Enfermedades Cardiacas'],
        datasets: [{
          label: 'Predicción de Enfermedades Cardiacas',
          data: [heartDiseaseCount.withHeartDisease, heartDiseaseCount.withoutHeartDisease],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      });

      const highBPHeartDiseaseGroups = {
        withHeartDisease: [0, 0],
        withoutHeartDisease: [0, 0]
      };
      data.forEach(item => {
        const highBP = item.HighBP;
        if (item.probabilidad >= 0.5) {
          if (highBP == 1) highBPHeartDiseaseGroups.withHeartDisease[0]++;
          else highBPHeartDiseaseGroups.withHeartDisease[1]++;
        } else {
          if (highBP == 1) highBPHeartDiseaseGroups.withoutHeartDisease[0]++;
          else highBPHeartDiseaseGroups.withoutHeartDisease[1]++;
        }
      });

      setHighBPHeartDiseaseData({
        labels: ['Con Presión Alta', 'Sin Presión Alta'],
        datasets: [
          {
            label: 'Con Enfermedades Cardiacas',
            data: highBPHeartDiseaseGroups.withHeartDisease,
            backgroundColor: '#FF6384',
          },
          {
            label: 'Sin Enfermedades Cardiacas',
            data: highBPHeartDiseaseGroups.withoutHeartDisease,
            backgroundColor: '#36A2EB',
          }
        ]
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
        <div className="chart-card">
          <h3>Distribución de la Salud General</h3>
          {generalHealthData ? <Bar data={generalHealthData} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Distribución de la Presión Arterial Alta</h3>
          {highBPData ? <Bar data={highBPData} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart-card">
          <h3>Visitas al Médico en el Último Año</h3>
          {doctorVisitData ? <Bar data={doctorVisitData} /> : <p>Cargando datos...</p>}
        </div>
        {/* <div className="chart-card">
          <h3>Relación entre Presión Arterial Alta y Enfermedades Cardiacas</h3>
          {highBPHeartDiseaseData ? <Bar data={highBPHeartDiseaseData} /> : <p>Cargando datos...</p>}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;