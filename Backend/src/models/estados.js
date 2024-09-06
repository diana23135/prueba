// models/Estados.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); 

const Estados = sequelize.define("Estados", {

  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  nombreEstados: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Estados;