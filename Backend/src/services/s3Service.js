//importa la cofiguracion
const config = require('../config/config');
//import axios para conectarse a API-Gateway de aws
const axios = require('axios');

//obtenemos url base de aws
const s3BaseUrl = config.aws3BaseUrl;


const getImage = async (user_id, task_id, image_name) => {
  try {
    const response = await axios.get(`${s3BaseUrl}?user_id=${user_id}&task_id=${task_id}&image_name=${image_name}`, { responseType: 'json' });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener la imagen: ${error.message}`);
  }
};
const getAll = async (user_id) => {
  try {
    const response = await axios.get(`${s3BaseUrl}?user_id=${user_id}`, { responseType: 'json' });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener las imagenes: ${error.message}`);
  }
};
const insertImage = async (content) => {
    try {
      
      const body = {
        fileBase64:content.fileBase64
      }
      // Enviar la imagen a S3
      const response = await axios.post(`${s3BaseUrl}?user_id=${content.user_id}&task_id=${content.task_id}&image_name=${content.image_name}`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error al cargar la imagen: ${error.message}`);
    }
};
const editImage = async (content) => {
  try {
    
    const body = {
      fileBase64:content.fileBase64
    }
    // Enviar la imagen a S3
    const response = await axios.put(`${s3BaseUrl}?user_id=${content.user_id}&task_id=${content.task_id}&image_name=${content.image_name}`, body, {
      headers: {
        'Content-Type': 'application/json' 
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al editar la imagen: ${error.message}`);
  }
};
const deleteImage = async (user_id, task_id, image_name) => {
  try {
    const response = await axios.delete(`${s3BaseUrl}?user_id=${user_id}&task_id=${task_id}&image_name=${image_name}`, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar la imagen: ${error.message}`);
  }
};
  

module.exports = { getImage, getAll, insertImage, editImage, deleteImage};
