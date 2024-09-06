
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const tareas = require('../models/tareas');

router.get("/", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});
router.get("/get-all", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
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