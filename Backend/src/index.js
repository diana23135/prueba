// server/index.js

const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
require('./db');

//definir la ruta a los endpoints
const tareas = require("./routes/tareas");
const comentarios = require("./routes/comentarios");
const imagenes = require("./routes/imagenes");
const usuarios = require("./routes/usuarios");
const estados = require("./routes/estados");

app.use("/tareas",tareas);
app.use("/comentarios",comentarios);
app.use("/imagenes",imagenes);
app.use("/usuarios",usuarios);
app.use("/estados",estados);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

