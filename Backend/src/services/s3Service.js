//importa la cofiguracion
const config = require('../config/config');
//import axios para conectarse a API-Gateway de aws
const axios = require('axios');

//obtenemos url base de aws
const s3BaseUrl = config.aws3BaseUrl;


const getImage = async (fileName) => {
  try {
    const response = await axios.get(`${s3BaseUrl}?fileName=${fileName}`, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener la imagen: ${error.message}`);
  }
};


const insertImage = async (body) => {
    try {
   
  
      // Enviar la imagen a S3
      const response = await axios.post(s3BaseUrl, body, {
        headers: {
          'Content-Type': 'application/json' // Asegúrate de que el servidor espera JSON
        }
      });
      return response.data; // Aquí puedes manejar la respuesta como necesites
    } catch (error) {
      throw new Error(`Error al cargar la imagen: ${error.message}`);
    }
  };
  

const deleteImage = async (fileName) => {
try {
    const response = await axios.delete(`${s3BaseUrl}?fileName=${fileName}`, { responseType: 'arraybuffer' });
    return response.data;
} catch (error) {
    throw new Error(`Error al eliminar la imagen: ${error.message}`);
}
};
  

module.exports = { getImage, insertImage, deleteImage};
