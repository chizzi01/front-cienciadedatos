import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACK_ROOT;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcmllbHEiLCJleHAiOjE3MzEyMDkzMzJ9.DkzE5A8pQKG9GO288FsMLNl3mhJF13Psddv9d283DpU'

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
