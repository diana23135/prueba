// models/Usuarios.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize"); 

const Usuarios = sequelize.define("Usuarios", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true, // Agregado para definir 'id' como clave primaria
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuarios;
