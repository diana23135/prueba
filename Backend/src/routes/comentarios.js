
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const comments = require('../models/comentarios');

router.get("/", async (req, res) => {
    const commentId = req.params.id;
    if(commentId){
        const result = await comments.findByPk(commentId);
        res.status(200).json(result);
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.get("/get-all", async (req, res)=>{
    const comentarios = await comments.findAll();
    res.json(comentarios);
});
router.delete("/", async (req, res) => {
    const commentId = req.params.id;
    if(commentId){
        await comments.destroy({where:{id:commentId}});
        res.status(200).json({message: "Se elimino con exito el id: " + commentId});
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.put("/", async (req, res) => {
    const comentarios = await comments.findAll();
    res.json(comentarios);
});
router.post("/", async (req, res) => {
    const comentarios = await comments.findAll();
    res.json(comentarios);
});

module.exports = router;