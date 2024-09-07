
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const states = require('../models/estados');
const validateDto = require('../middlewares/validateDto');
const {stateDto} = require('../dtos/dtos');

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
router.post("/", validateDto(stateDto), async (req, res) => {
    const body = req.body;
    if (body) {
        try {
          await states.create(body);
          res
            .status(200)
            .json({ message: "se ha registrado con exito el estado" });
        } catch (error) {
          res.status(505).json({ error: "no se ha podido registrar: " + error });
        }
      }
});

module.exports = router;