// models/imagenes.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize"); 
const tareas = require('./tareas'); 


const Imagenes = sequelize.define("Imagenes", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  nombreImagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  idTarea: {
    type: DataTypes.INTEGER,
    references: {
        model:tareas,
        key:"id",
    }
  }
});

module.exports = Imagenes;
