// models/Tareas.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize"); 
const usuario = require('./usuarios'); 
const estados = require('./estados'); 


const Tareas = sequelize.define("Tareas", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Valor predeterminado de la fecha actual
  },
  fechaFinalizacion: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
        model:usuario,
        key:"id",
    }
  },
  idEstados: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    references: {
        model:estados,
        key:"id",
    }
  }
});

module.exports = Tareas;
