import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGhvdG1haWwuY29tIiwiZXhwIjoxNzMwOTM4MjAxfQ.5VEzInUfxfPn2qhRg94ndT4WkszfMddKNP8m6iYV0Cc'

export const getDiabetesHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}historial-diabetes`, {
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
    const response = await axios.get(`${API_URL}historial-cardiaco`, {
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
