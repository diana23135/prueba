
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const usuarios = require('../models/usuarios');

router.get("/", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});
router.get("/get-all", (req, res) => {
    const usuarios = await usuarios.findAll();
    res.json(usuarios);
});
router.delete("/", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});
router.put("/", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});
router.post("/", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});

module.exports = router;