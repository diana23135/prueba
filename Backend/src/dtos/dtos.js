const userDto = {
    requiredFields: ["nombreUsuario", "correo", "contraseña"],
  };
  const loginDto = {
    requiredFields: ["correo", "contraseña"],
  };

  const stateDto = {
    requiredFields: ["nombreEstados"],
  };
  const commentDto = {
    requiredFields: ["titulo", "contenido", "idTarea"],
  };
  
  const imageDto = {
    requiredFields: ["nombreImagen", "idTarea", "fileBase64", "idUser"],
  };
  const imageEditDto = {
    requiredFields: ["user_id", "task_id", "image_name", "fileBase64"],
  };
  const taskDto = {
    requiredFields: ["nombre", "descripcion", "idUsuario"],
  };
  
  
  module.exports = { userDto, stateDto, commentDto, imageDto, taskDto, loginDto, imageEditDto };