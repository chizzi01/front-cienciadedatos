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
  const [bmiByAgeData, setBmiByAgeData] = useState(null);
  const [heartDiseaseByAgeData, setHeartDiseaseByAgeData] = useState(null);
  const [conclusions, setConclusions] = useState({
    diabetes: '',
    age: '',
    cholesterol: '',
    bmi: '',
    generalHealth: '',
    highBP: '',
    doctorVisit: '',
    bmiByAge: '',
    heartDisease: '',
    heartDiseaseByAge: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const diabetesData = await getDiabetesHistory();
      const heartDiseaseData = await getHeartDiseaseHistory();

      const diabetesCount = {
        withDiabetes: diabetesData.filter(item => item.resultado === 'positivo').length,
        withoutDiabetes: diabetesData.filter(item => item.resultado === 'negativo').length,
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
      diabetesData.forEach(item => {
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
      diabetesData.forEach(item => {
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
      diabetesData.forEach(item => {
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
      diabetesData.forEach(item => {
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
      diabetesData.forEach(item => {
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
      diabetesData.forEach(item => {
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

      const bmiByAgeGroups = {
        '18-24': [0, 0, 0, 0],
        '25-34': [0, 0, 0, 0],
        '35-44': [0, 0, 0, 0],
        '45-54': [0, 0, 0, 0],
        '55-64': [0, 0, 0, 0],
        '65+': [0, 0, 0, 0]
      };

      const ageGroupColors = {
        '18-24': '#FF6384',
        '25-34': '#36A2EB',
        '35-44': '#FFCE56',
        '45-54': '#4BC0C0',
        '55-64': '#9966FF',
        '65+': '#FF9F40'
      };

      diabetesData.forEach(item => {
        const age = item.Age;
        const bmi = item.BMI;
        let ageGroup;
        if (age === 1) ageGroup = '18-24';
        else if (age === 2 || age === 3) ageGroup = '25-34';
        else if (age === 4 || age === 5) ageGroup = '35-44';
        else if (age === 6 || age === 7) ageGroup = '45-54';
        else if (age === 8 || age === 9) ageGroup = '55-64';
        else ageGroup = '65+';

        if (bmi < 18.5) bmiByAgeGroups[ageGroup][0]++;
        else if (bmi < 25) bmiByAgeGroups[ageGroup][1]++;
        else if (bmi < 30) bmiByAgeGroups[ageGroup][2]++;
        else bmiByAgeGroups[ageGroup][3]++;
      });

      setBmiByAgeData({
        labels: ['Bajo Peso', 'Peso Normal', 'Sobrepeso', 'Obesidad'],
        datasets: Object.keys(bmiByAgeGroups).map(ageGroup => ({
          label: ageGroup,
          data: bmiByAgeGroups[ageGroup],
          backgroundColor: ageGroupColors[ageGroup],
        }))
      });

      const heartDiseaseCount = {
        withHeartDisease: heartDiseaseData.filter(item => item.probabilidad >= 0.5).length,
        withoutHeartDisease: heartDiseaseData.filter(item => item.probabilidad < 0.5).length,
      };

      setHeartDiseaseData({
        labels: ['Con Enfermedades Cardiacas', 'Sin Enfermedades Cardiacas'],
        datasets: [{
          label: 'Predicción de Enfermedades Cardiacas',
          data: [heartDiseaseCount.withHeartDisease, heartDiseaseCount.withoutHeartDisease],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      });

      const heartDiseaseByAgeGroups = [0, 0, 0, 0, 0, 0];
      heartDiseaseData.forEach(item => {
        const age = item.Age;
        if (age === 1) heartDiseaseByAgeGroups[0]++;
        else if (age === 2 || age === 3) heartDiseaseByAgeGroups[1]++;
        else if (age === 4 || age === 5) heartDiseaseByAgeGroups[2]++;
        else if (age === 6 || age === 7) heartDiseaseByAgeGroups[3]++;
        else if (age === 8 || age === 9) heartDiseaseByAgeGroups[4]++;
        else heartDiseaseByAgeGroups[5]++;
      });

      setHeartDiseaseByAgeData({
        labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [{
          label: 'Cantidad de Personas con Enfermedades Cardiacas por Edad',
          data: heartDiseaseByAgeGroups,
          backgroundColor: '#FF6384',
        }]
      });

      // Calcular conclusiones dinámicas
      const maxDiabetesAgeGroup = ageGroups.indexOf(Math.max(...ageGroups));
      const maxHeartDiseaseAgeGroup = heartDiseaseByAgeGroups.indexOf(Math.max(...heartDiseaseByAgeGroups));

      setConclusions({
        diabetes: diabetesCount.withDiabetes > diabetesCount.withoutDiabetes
          ? `Hay ${diabetesCount.withDiabetes} personas con diabetes, lo que representa un mayor porcentaje en comparación con las ${diabetesCount.withoutDiabetes} personas sin diabetes.`
          : `Existen ${diabetesCount.withoutDiabetes} personas sin diabetes, superando a las ${diabetesCount.withDiabetes} personas con diabetes en la población analizada.`,

        age: ageGroups[0] > 0
          ? `El grupo de personas más joven (18-24 años) presenta ${ageGroups[0]} casos de diabetes, lo que sugiere una tendencia a la diabetes temprana.`
          : `La diabetes está distribuida de manera relativamente uniforme en todas las edades, con un total de ${ageGroups.reduce((a, b) => a + b, 0)} casos analizados.`,

        cholesterol: cholesterolGroups[1] > cholesterolGroups[0]
          ? `De los ${cholesterolGroups[1] + cholesterolGroups[0]} individuos analizados, ${cholesterolGroups[1]} tienen niveles altos de colesterol, lo que indica una prevalencia significativa de colesterol elevado en la muestra.`
          : `De los ${cholesterolGroups[1] + cholesterolGroups[0]} casos, la mayoría (con ${cholesterolGroups[0]} personas) presentan niveles normales de colesterol.`,

        bmi: bmiGroups[3] > bmiGroups[1]
          ? `Se observa que ${bmiGroups[3]} personas tienen obesidad, frente a ${bmiGroups[1]} que tienen un peso normal, lo que indica una prevalencia más alta de obesidad en esta muestra.`
          : `${bmiGroups[1]} personas tienen un peso normal, superando a las ${bmiGroups[3]} personas con obesidad, lo que sugiere una mejor distribución de peso en esta población.`,

        generalHealth: generalHealthGroups[0] > generalHealthGroups[1]
          ? `El grupo más grande, con ${generalHealthGroups[0]} personas, califica su salud como excelente o muy buena, indicando un bienestar general elevado en la muestra.`
          : `Aunque ${generalHealthGroups[0]} personas reportan una excelente o buena salud, un total de ${generalHealthGroups[4]} personas calificaron su salud como mala, lo que señala la necesidad de atención médica para algunos segmentos.`,

        highBP: highBPGroups[1] > highBPGroups[0]
          ? `De las ${highBPGroups[0] + highBPGroups[1]} personas analizadas, ${highBPGroups[1]} padecen presión arterial alta, lo que resalta la prevalencia de esta condición en la población.`
          : `Más personas en la muestra no padecen de presión arterial alta (con ${highBPGroups[0]} individuos sin ella), lo que sugiere que la mayoría de la población tiene una presión arterial saludable.`,

        doctorVisit: doctorVisitGroups.withDiabetes[0] > doctorVisitGroups.withoutDiabetes[0]
          ? `De las ${doctorVisitGroups.withDiabetes[0] + doctorVisitGroups.withoutDiabetes[0]} personas que visitaron al médico, ${doctorVisitGroups.withDiabetes[0]} eran personas con diabetes, lo que refleja una mayor conciencia médica entre los afectados por esta enfermedad.`
          : `En total, ${doctorVisitGroups.withoutDiabetes[0]} personas sin diabetes visitaron al médico, lo que indica que menos personas con diabetes (solo ${doctorVisitGroups.withDiabetes[0]}) buscaron atención médica.`,

          bmiByAge: (() => {
            let totalUnderweight = 0, totalNormal = 0, totalOverweight = 0, totalObesity = 0, totalPeople = 0;
            
            Object.keys(bmiByAgeGroups).forEach(ageGroup => {
              const [underweight, normal, overweight, obesity] = bmiByAgeGroups[ageGroup];
              totalUnderweight += underweight;
              totalNormal += normal;
              totalOverweight += overweight;
              totalObesity += obesity;
              totalPeople += underweight + normal + overweight + obesity;
            });
          
            return totalPeople > 0 
              ? `En total, de las ${totalPeople} personas analizadas, ${totalOverweight} tienen sobrepeso y ${totalObesity} padecen obesidad. Esto muestra una alta prevalencia de problemas relacionados con el peso, mientras que ${totalNormal} tienen un peso normal y ${totalUnderweight} están por debajo del peso saludable.`
              : 'No hay datos disponibles para las categorías de IMC por edad.';
          })()
          
,
          heartDiseaseByAge: (() => {
            let totalCases = 0, totalGroups = 0;
          
            Object.keys(heartDiseaseByAgeGroups).forEach(ageGroup => {
              totalCases += heartDiseaseByAgeGroups[ageGroup];
              totalGroups++;
            });
          
            const maxHeartDiseaseAgeGroup = heartDiseaseByAgeGroups.indexOf(Math.max(...heartDiseaseByAgeGroups));
            const ageGroupLabels = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
            const maxAgeGroupLabel = ageGroupLabels[maxHeartDiseaseAgeGroup];

            return totalCases > 0
              ? `En total, se registraron ${totalCases} casos de enfermedad cardíaca, con una mayor prevalencia en el grupo de edad ${maxAgeGroupLabel}.`
              : 'No se registraron casos de enfermedad cardíaca en los grupos de edad analizados.';
          })(),

          heartDisease: heartDiseaseCount.withHeartDisease > heartDiseaseCount.withoutHeartDisease
          ? `Se registraron ${heartDiseaseCount.withHeartDisease} casos de enfermedad cardíaca, lo que indica una prevalencia significativa en la muestra analizada.`
          : `La mayoría de los casos analizados (${heartDiseaseCount.withoutHeartDisease}) no presentan enfermedades cardíacas, lo que sugiere una baja prevalencia en la población.`
          
          
          
      });

    };
    fetchData();
  }
    , []);


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Salud</h1>
      <div className="charts-container">
        <div className="chart-card">
          <h3>Estado de Diabetes</h3>
          {diabetesData ? <Pie data={diabetesData} options={{ plugins: { title: { display: true, text: 'Estado de Diabetes' } } }} style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.diabetes}</p>
        </div>
        <div className="chart-card">
          <h3>Cantidad de Personas con Diabetes por Edad</h3>
          {ageData ? <Bar data={ageData} options={{ plugins: { title: { display: true, text: 'Cantidad de Personas con Diabetes por Edad' } }, scales: { x: { title: { display: true, text: 'Edad' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.age}</p>
        </div>
        <div className="chart-card">
          <h3>Distribución del Colesterol</h3>
          {cholesterolData ? <Bar data={cholesterolData} options={{ plugins: { title: { display: true, text: 'Distribución del Colesterol' } }, scales: { x: { title: { display: true, text: 'Nivel de Colesterol' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.cholesterol}</p>
        </div>
        <div className="chart-card">
          <h3>Distribución del IMC</h3>
          {bmiData ? <Bar data={bmiData} options={{ plugins: { title: { display: true, text: 'Distribución del IMC' } }, scales: { x: { title: { display: true, text: 'Categoría de IMC' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.bmi}</p>
        </div>
        <div className="chart-card">
          <h3>Distribución de la Salud General</h3>
          {generalHealthData ? <Bar data={generalHealthData} options={{ plugins: { title: { display: true, text: 'Distribución de la Salud General' } }, scales: { x: { title: { display: true, text: 'Estado de Salud' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.generalHealth}</p>
        </div>
        <div className="chart-card">
          <h3>Distribución de la Presión Arterial Alta</h3>
          {highBPData ? <Bar data={highBPData} options={{ plugins: { title: { display: true, text: 'Distribución de la Presión Arterial Alta' } }, scales: { x: { title: { display: true, text: 'Presión Arterial' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.highBP}</p>
        </div>
        <div className="chart-card">
          <h3>Visitas al Médico en el Último Año</h3>
          {doctorVisitData ? <Bar data={doctorVisitData} options={{ plugins: { title: { display: true, text: 'Visitas al Médico en el Último Año' } }, scales: { x: { title: { display: true, text: 'Visitas al Médico' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.doctorVisit}</p>
        </div>
        <div className="chart-card">
          <h3>Distribución del IMC por Edad</h3>
          {bmiByAgeData ? <Bar data={bmiByAgeData} options={{ plugins: { title: { display: true, text: 'Distribución del IMC por Edad' } }, scales: { x: { title: { display: true, text: 'Categoría de IMC' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.bmiByAge}</p>
        </div>
        <div className="chart-card">
          <h3>Predicción de Enfermedades Cardiacas</h3>
          {heartDiseaseData ? <Bar data={heartDiseaseData} options={{ plugins: { title: { display: true, text: 'Predicción de Enfermedades Cardiacas' } }, scales: { x: { title: { display: true, text: 'Estado' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.heartDisease}</p>
        </div>
        <div className="chart-card">
          <h3>Cantidad de Personas con Enfermedades Cardiacas por Edad</h3>
          {heartDiseaseByAgeData ? <Bar data={heartDiseaseByAgeData} options={{ plugins: { title: { display: true, text: 'Cantidad de Personas con Enfermedades Cardiacas por Edad' } }, scales: { x: { title: { display: true, text: 'Edad' } }, y: { title: { display: true, text: 'Cantidad' } } } }} /> : <p>Cargando datos...</p>}
          <p style={{ color: "#7d7d7d", marginTop: 10 }}>{conclusions.heartDiseaseByAge}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;