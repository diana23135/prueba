
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const states = require('../models/estados');

router.get("/", async (req, res) => {
    const imageId = req.params.id;
    if(imageId){
        const result = await states.findByPk(imageId);
        res.status(200).json(result);
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.get("/get-all", async (req, res)=>{
    const estados = await states.findAll();
    res.json(estados);
});
router.delete("/", async (req, res) => {
    const stateId = req.params.id;
    if(stateId){
        await states.destroy({where:{id:stateId}});
        res.status(200).json({message: "Se elimino con exito el id: " + stateId});
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.put("/", async (req, res) => {
    const estados = await states.findAll();
    res.json(estados);
});
router.post("/", async (req, res) => {
    const estados = await states.findAll();
    res.json(estados);
});

module.exports = router;