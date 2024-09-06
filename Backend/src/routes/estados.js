
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const estados = require('../models/estados');

router.get("/", (req, res) => {
    res.json({ message: "Hola respondo " });
});
router.get("/get-all", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});
router.delete("/", (req, res) => {
    res.json({ message: "Hola mi amor" });
});
router.put("/", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});
router.post("/", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});

module.exports = router;