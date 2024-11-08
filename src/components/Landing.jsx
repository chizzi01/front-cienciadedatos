import { useNavigate } from 'react-router-dom';
import '../App.css';
import doctorImg from '../assets/doctor.svg';
import { FaFileWaveform } from "react-icons/fa6";

function Landing() {
  const navigate = useNavigate();

  const handleEvaluateClick = () => {
    navigate('/form');
  };

  return (
    <div className="landing">
      <h1>Bienvenido a la Evaluación de Diabetes</h1>
      <img src={doctorImg} alt="imagen doctor" style={{width:'50%'}} />
      <h2> 
        Esta aplicación te ayudará a determinar tu riesgo de diabetes. <br />
        Para ello, deberás completar un formulario con información personal y de salud.
      </h2>
      <h3>
        Ya detectamos mas de 1000 casos de diabetes en el mundo.
      </h3>
      <div>
      <p>Presiona el botón a continuación para comenzar tu evaluación.</p>
      <button onClick={handleEvaluateClick}>Evaluarme <FaFileWaveform size={20}/></button>
      </div>
    </div>
  );
}

export default Landing;