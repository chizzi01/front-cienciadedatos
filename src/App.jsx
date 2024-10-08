import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    edad: '',
    imc: '',
    hbA1c: '',
    glucosa: '',
    saludGeneral: '',
    presionArterial: '',
    dificultadCaminar: '',
    colesterol: '',
    problemasCardiacos: '',
    malaSaludFisica: '',
    ingresos: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data to determine diabetes risk
    console.log(formData);
  };

  return (
    <div className="App">
      <h1>Formulario de Evaluación de Diabetes</h1>
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='left-group'>
            <label>
              Edad:
              <input type="number" name="edad" value={formData.edad} onChange={handleChange} />
            </label>
            <label>
              IMC:
              <input type="number" name="imc" value={formData.imc} onChange={handleChange} />
            </label>
            <label>
              Nivel de HbA1c:
              <input type="number" name="hbA1c" value={formData.hbA1c} onChange={handleChange} />
            </label>
            <label>
              Nivel de glucosa en sangre:
              <input type="number" name="glucosa" value={formData.glucosa} onChange={handleChange} />
            </label>

            <label>
              Nivel de salud general:
              <input type="text" name="saludGeneral" value={formData.saludGeneral} onChange={handleChange} />
            </label>
            <label>
              Presión arterial:
              <input type="text" name="presionArterial" value={formData.presionArterial} onChange={handleChange} />
            </label>
          </div>
          <div className='right-group'>
            <label>
              Dificultad para caminar:
              <input type="text" name="dificultadCaminar" value={formData.dificultadCaminar} onChange={handleChange} />
            </label>
            <label>
              Colesterol:
              <input type="number" name="colesterol" value={formData.colesterol} onChange={handleChange} />
            </label>
            <label>
              Historial de problemas cardiacos:
              <input type="text" name="problemasCardiacos" value={formData.problemasCardiacos} onChange={handleChange} />
            </label>
            <label>
              Mala salud física en general:
              <input type="text" name="malaSaludFisica" value={formData.malaSaludFisica} onChange={handleChange} />
            </label>
            <label>
              Nivel de ingresos:
              <input type="number" name="ingresos" value={formData.ingresos} onChange={handleChange} />
            </label>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;