import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_ROOT;
const token = localStorage.getItem('token');

export const getDiabetesHistory = async () => {
  try {
    const response = await axios.get(`${apiUrl}/historial-diabetes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el historial de diabetes:", error);
    return [];
  }
};


export const getHeartDiseaseHistory = async () => {
  try {
    const response = await axios.get(`${apiUrl}/historial-cardiaco`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el historial de enfermedades cardíacas:", error);
    return [];
  }
};
