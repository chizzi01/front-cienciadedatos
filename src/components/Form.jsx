import { useState } from 'react';
import '../App.css';

function Form() {
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
    ingresos: '',
    stroke: '',
    chequeoColesterol: '',
    actFisica: '',
    vegetales: '',
    alcohol: ''
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
    console.log(formData);
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
              Nivel de HbA1c:
              <input type="number" name="hbA1c" min={3.5} max={9} value={formData.hbA1c} onChange={handleChange} />
            </label>
            <label>
              Nivel de glucosa en sangre:
              <input type="number" name="glucosa" min={80} max={300} value={formData.glucosa} onChange={handleChange} />
            </label>
            <label>
              Presión arterial alta?
              <select name="presionArterial" value={formData.presionArterial} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
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
              ¿Colesterol alto?
              <select name="colesterol" value={formData.colesterol} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Fuma?:
              <select name="fuma" value={formData.fuma} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Se ha chequeado el colesterol recientemente?:
              <select name="chequeoColesterol" value={formData.chequeoColesterol} onChange={handleChange}>
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
              ¿Come frutas habitualmente? :
              <select name="frutas" value={formData.frutas} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Come vegetales habitualmente? :
              <select name="vegetales" value={formData.vegetales} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label>
              ¿Consume mucho alcohol? :
              <select name="alcohol" value={formData.alcohol} onChange={handleChange}>
                <option value='' hidden>Selecciona una opción</option>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>
            </label>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Form;
