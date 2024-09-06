// models/Comentarios.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); 
const tareas = require('./tareas'); 


const Comentarios = sequelize.define("Comentarios", {

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
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

module.exports = Comentarios;
