import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    edad: '',
    peso: '',
    altura: '',
    imc: '',
    hbA1c: '',
    glucosa: '',
    saludGeneral: '',
    sexo: '',
    fuma: '',
    derrame: '',
    frutas: '',
    presionArterial: '',
    dificultadCaminar: '',
    colesterol: '',
    problemasCardiacos: '',
    saludFisica: '',
    ingresos: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      imc: formData.peso / (formData.altura / 100) ** 2
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
              Sexo:
              <select name="sexo" value={formData.sexo} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Masculino</option>
                <option value={0}>Femenino</option>
              </select>
            </label>
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
              Nivel de HbA1c:
              <input type="number" name="hbA1c" min={3.5} max={9} value={formData.hbA1c} onChange={handleChange} />
            </label>
            <label>
              Nivel de glucosa en sangre:
              <input type="number" name="glucosa" min={80} max={300} value={formData.glucosa} onChange={handleChange} />
            </label>
            <label>
              Presión arterial:
              <input type="text" name="presionArterial" value={formData.presionArterial} onChange={handleChange} />
            </label>
          </div>
          <div className='right-group'>
            <label>
              ¿Fuma?:
              <select name="saludGeneral" value={formData.fuma} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              Dificultad para caminar:
              <select name="dificultadCaminar" value={formData.dificultadCaminar} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              Colesterol:
              <input type="number" name="colesterol" value={formData.colesterol} onChange={handleChange} />
            </label>
            <label>
              ¿Come frutas habitualmente? :
              <select name="saludGeneral" value={formData.frutas} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Tuvo problemas cardiacos?:
              <select name="problemasCardiacos" value={formData.problemasCardiacos} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Tuvo algun derrame cerebral?:
              <select name="saludGeneral" value={formData.derrame} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Cómo considera su salud física?:
              <select name="saludFisica" value={formData.saludFisica} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Excelente</option>
                <option value={2}>Muy Buena</option>
                <option value={3}>Buena</option>
                <option value={4}>Regular</option>
                <option value={5}>Mala</option>
              </select>
            </label>
            <label>
              Nivel de ingresos:
              <select name="ingresos" value={formData.ingresos} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Bajo</option>
                <option value={2}>Medio</option>
                <option value={3}>Alto</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;