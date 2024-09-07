const userDto = {
    requiredFields: ["nombreUsuario", "correo", "contraseña"],
  };
  const stateDto = {
    requiredFields: ["nombreEstados"],
  };
  const commentDto = {
    requiredFields: ["titulo", "contenido", "idTarea"],
  };
  
  const imageDto = {
    requiredFields: ["nombreImagen", "ruta", "idTarea"],
  };
  
  const taskDto = {
    requiredFields: ["nombre", "estado","idUsuario"],
  };
  
  
  module.exports = { userDto, stateDto, commentDto, imageDto, taskDto };