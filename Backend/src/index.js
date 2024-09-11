// server/index.js
//importaciones 
const express = require("express");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


//configure puerto por defeto o del enviroment
const PORT = process.env.PORT || 3001;

//creamos una instancia de express
const app = express();


//CONFIGURAR INFORMACION DEL SWAGGER
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentación ( ECCARGO )',
      version: '1.0.0',
      description: 'documentación y pruebas de API con swagger para prueba tecnica',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos de rutas 
}









//configurar cors (cross origin resource sharing)
app.use(cors());
//configurar json en express 
app.use(express.json());
// Inicializar Swagger-JSDoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);
// Configurar Swagger UI en una ruta
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//importacion de la base de datos
require('./db');

//importar rutas endpoints
const tareas = require("./routes/tareas");
const comentarios = require("./routes/comentarios");
const imagenes = require("./routes/imagenes");
const usuarios = require("./routes/usuarios");
const estados = require("./routes/estados");

//usar dentro de express las rutas y definir sus endpoints
app.use("/tareas",tareas);
app.use("/comentarios",comentarios);
app.use("/imagenes",imagenes);
app.use("/usuarios",usuarios);
app.use("/estados",estados);

//ejecutar express
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});

