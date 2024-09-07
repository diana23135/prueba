const Usuario = require('./usuarios');
const Tareas = require('./tareas');
const Imagenes = require('./imagenes');
const Comentarios = require('./comentarios');
const Estados = require('./estados');

// Definir relaciones

// comentarios - tareas 
Comentarios.belongsTo(Tareas, { foreignKey: 'idTarea' }); // Un comentario pertenece a una tarea
Tareas.hasMany(Comentarios, { foreignKey: 'idTarea' }); // Una tarea tiene muchos comentarios

// imagenes - tareas
Imagenes.belongsTo(Tareas, { foreignKey: 'idTarea' }); // Una imagen pertenece a una tarea
Tareas.hasMany(Imagenes, { foreignKey: 'idTarea' }); // Una tarea tiene muchas imágenes

// tareas - usuario
Usuario.hasMany(Tareas, { foreignKey: 'userId' }); // Un usuario tiene muchas tareas
Tareas.belongsTo(Usuario, { foreignKey: 'userId' }); //Una tarea pertenece a un usuario

// tareas - estados
Estados.hasMany(Tareas, { foreignKey: 'estadoId' }); // Un estado tiene muchas tareas
Tareas.belongsTo(Estados, { foreignKey: 'estadoId' }); // Una tarea pertenece a un estado

module.exports = { Usuario, Tareas, Imagenes, Comentarios, Estados };