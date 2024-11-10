import { useState } from 'react';
import '../App.css';
import postFormularioDiabetes from '../controllers/postFormularioDiabetes';
import postFormularioCardiaco from '../controllers/postFormularioCardiaco';

function Form() {
  const [formData, setFormData] = useState({
    edad: '',
    peso: '',
    altura: '',
    imc: '',
    hbA1c: '',
    glucosa: '',
    saludGeneral: '',
    presionArterial: '',
    dificultadCaminar: '',
    colesterol: '',
    problemasCardiacos: '',
    saludFisica: '',
    chequeoMedico: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [probability, setProbability] = useState(0);
  const [isHeartCheckModalOpen, setIsHeartCheckModalOpen] = useState(false);
  const [result, setResult] = useState({});
  const [showHeartCheckForm, setShowHeartCheckForm] = useState(false);
  const [resultCardiaco, setResultCardiaco] = useState({});
  const [isModalCardiaco, setIsModalCardiaco] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      imc: formData.peso / (formData.altura / 100) ** 2
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const diabetesResult = await postFormularioDiabetes(formData.saludGeneral, formData.presionArterial, formData.imc, formData.dificultadCaminar, formData.colesterol, formData.edad, formData.problemasCardiacos, formData.saludFisica, formData.chequeoMedico);
      setResult(diabetesResult);
      setIsModalOpen(true);
      if (diabetesResult.probabilidad_diabetes >= 0.5) {
        setIsHeartCheckModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeHeartCheckModal = () => {
    setIsHeartCheckModalOpen(false);
    setShowHeartCheckForm(false);
    setIsModalOpen(false);
  };

  const handleHeartCloseCardiaco = () => {
    setIsModalCardiaco(false);
    setIsModalOpen(false);
  };

  const handleHeartCheckSubmit = async (e) => {
    e.preventDefault();
    setIsModalCardiaco(true);
    try {
      const edadMaxima = getEdadMaxima(formData.edad);
      console.log(formData.hbA1c, formData.glucosa, formData.imc, edadMaxima);
      const cardiacoResult = await postFormularioCardiaco(formData.hbA1c, formData.glucosa, formData.imc, edadMaxima);
      setResultCardiaco(cardiacoResult);
      setShowHeartCheckForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getEdadMaxima = (edad) => {
    const edadesMaximas = {
      1: 24,
      2: 29,
      3: 34,
      4: 39,
      5: 44,
      6: 49,
      7: 54,
      8: 59,
      9: 64,
      10: 69,
      11: 74,
      12: 79,
      13: 80,
    };
    return edadesMaximas[edad] || 0;
  };

  const handleHeartCheckAccept = () => {
    setShowHeartCheckForm(true);
  };

  return (
    <div className="Form">
      <h1>Formulario de Evaluación de Diabetes</h1>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='left-group'>
            <label>
              Rango de edad:
              <select name="edad" value={formData.edad} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Entre 18 y 24 años</option>
                <option value={2}>Entre 25 y 29 años</option>
                <option value={3}>Entre 30 y 34 años</option>
                <option value={4}>Entre 35 y 39 años</option>
                <option value={5}>Entre 40 y 44 años</option>
                <option value={6}>Entre 45 y 49 años</option>
                <option value={7}>Entre 50 y 54 años</option>
                <option value={8}>Entre 55 y 59 años</option>
                <option value={9}>Entre 60 y 64 años</option>
                <option value={10}>Entre 65 y 69 años</option>
                <option value={11}>Entre 70 y 74 años</option>
                <option value={12}>Entre 75 y 79 años</option>
                <option value={13}>80 años o más</option>
              </select>
            </label>
            <label>
              Peso en Kg:
              <input type="number" name="peso" value={formData.peso} onChange={handleChange} />
            </label>
            <label>
              Altura en cm:
              <input type="number" name="altura" value={formData.altura} onChange={handleChange} />
            </label>
            <label>
              ¿Cuantos dias lleva con malestar?:
              <input type="number" name="saludFisica" min={0} max={30} value={formData.saludFisica} onChange={handleChange} />
            </label>
            <label>
              ¿Cómo considera su salud general?:
              <select name="saludGeneral" value={formData.saludGeneral} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Excelente</option>
                <option value={2}>Muy Buena</option>
                <option value={3}>Buena</option>
                <option value={4}>Regular</option>
                <option value={5}>Mala</option>
              </select>
            </label>
          </div>
          <div className='right-group'>
            <label>
              Presión arterial alta?
              <select name="presionArterial" value={formData.presionArterial} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Colesterol alto?
              <select name="colesterol" value={formData.colesterol} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Fue al medico en el último año?:
              <select name="chequeoMedico" value={formData.chequeoMedico} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Tiene dificultad para caminar?:
              <select name="dificultadCaminar" value={formData.dificultadCaminar} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Tiene alguna enfermedad cardiaca? :
              <select name="problemasCardiacos" value={formData.problemasCardiacos} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Resultado</h2>
            <p>La probabilidad de que tenga diabetes es: </p>
            <h3>{(result.probabilidad_diabetes * 100).toFixed(2)}%</h3>
            {result.probabilidad_diabetes >= 0.5 && (
              <div>
                <p style={{ color: '#ff4a4a', fontWeight: 'bold' }}>
                  Se recomienda ir a un médico para hacerse un chequeo más exhaustivo.
                </p>
                <p>¿Desea realizar un chequeo de enfermedades cardiacas?</p>
                <p>Se pedirá que tenga a mano los siguientes datos: Nivel de HbA1c y Nivel de glucosa en sangre</p>
                <button onClick={handleHeartCheckAccept}>Sí</button>
                <button style={{marginTop:10}} onClick={closeHeartCheckModal}>No</button>
              </div>
            )}
          </div>
        </div>
      )}

      {isHeartCheckModalOpen && showHeartCheckForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeHeartCheckModal}>&times;</span>
            <h2>Formulario de Chequeo Cardíaco</h2>
            <form onSubmit={handleHeartCheckSubmit}>
              <label style={{width:"100%"}}>
                Nivel de HbA1c:
                <input type="number" name="hbA1c" min={3.5} max={9} value={formData.hbA1c} onChange={handleChange} />
              </label>
              <label style={{width:"100%"}}>
                Nivel de glucosa en sangre:
                <input type="number" name="glucosa" min={80} max={300} value={formData.glucosa} onChange={handleChange} />
              </label>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}

      {isModalCardiaco && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleHeartCloseCardiaco}>&times;</span>
            <h2>Resultado del Chequeo Cardíaco</h2>
            <p>La probabilidad de que tenga problemas cardiacos es: </p>
            <h3>{(resultCardiaco.probabilidad_cardiaco * 100).toFixed(2)}%</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;