// models/Estados.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize"); 

const Estados = sequelize.define("Estados", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  nombreEstados: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Estados;