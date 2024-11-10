import { useState } from 'react';
import '../App.css';
import login from '../controllers/login';

function Login() {
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Process form data to determine diabetes risk
      console.log(formData);
      const response = await login(formData.user, formData.password);
      console.log(response);
      if (response == 200) {
        window.location.href = '/reporte';
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='loginAlign'>
        <label>
          Usuario:
          <input type="text" name="user" value={formData.user} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Iniciar sesion</button>
      </form>
    </div>
  );
}

export default Login;