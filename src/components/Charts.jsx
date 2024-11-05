import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Charts = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const lineChart = lineChartRef.current;
    const barChart = barChartRef.current;
    const pieChart = pieChartRef.current;

    return () => {
      if (lineChart) {
        lineChart.destroy();
      }
      if (barChart) {
        barChart.destroy();
      }
      if (pieChart) {
        pieChart.destroy();
      }
    };
  }, []);

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  if (!isMounted) {
    return null;
  }

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true
  };

  return (
    <div>
        {/* <div>
            <h1>Mi Prediccion</h1>
            <div className='miHistorial-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>IMC</th>
                            <th>Diabetes</th>
                            <th>Presión Arterial</th>
                            <th>Colesterol</th>
                            <th>Problemas Cardiacos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2024-10-01</td>
                            <td>25.5</td>
                            <td>0</td>
                            <td>120/80</td>
                            <td>200</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2024-10-02</td>
                            <td>26.5</td>
                            <td>0</td>
                            <td>120/80</td>
                            <td>200</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2024-10-03</td>
                            <td>27.5</td>
                            <td>0</td>
                            <td>120/80</td>
                            <td>200</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2024-10-04</td>
                            <td>28.5</td>
                            <td>0</td>
                            <td>120/80</td>
                            <td>200</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2024-10-05</td>
                            <td>29.5</td>
                            <td>0</td>
                            <td>120/80</td>
                            <td>200</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> */}

      <div className='chart-container'>
        <h2>Diabetes Historica</h2>
        <div className='chart-wrapper'>
          <Pie ref={pieChartRef} data={pieData} options={chartOptions} />
        </div>
        <h2>Probabilidad por mes</h2>
        <div className='chart-wrapper'>
          <Line ref={lineChartRef} data={lineData} options={chartOptions} />
        </div>
        <h2>Diabetes por edad admin</h2>
        <div className='chart-wrapper'>
          <Bar ref={barChartRef} data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;