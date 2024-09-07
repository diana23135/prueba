const validateDto = require('../middlewares/validateDto');
const {commentDto} = require('../dtos/dtos');
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
router.post("/", validateDto(commentDto), async (req, res) => {
    const body = req.body;
    if (body) {
        try {
          await comments.create(body);
          res
            .status(200)
            .json({ message: "se ha registrado con exito el comentario" });
        } catch (error) {
          res.status(505).json({ error: "no se ha podido registrar: " + error });
        }
      }
});

module.exports = router;