
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const images = require('../models/imagenes');
const validateDto = require('../middlewares/validateDto');
const {imageDto} = require('../dtos/dtos');

router.get("/", async (req, res) => {
    const imageId = req.params.id;
    if(imageId){
        const result = await images.findByPk(imageId);
        res.status(200).json(result);
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.get("/get-all", async (req, res)=>{
    const imagenes = await images.findAll();
    res.json(imagenes);
});
router.delete("/", async (req, res) => {
    const imageId = req.params.id;
    if(imageId){
        await images.destroy({where:{id:imageId}});
        res.status(200).json({message: "Se elimino con exito el id: " + imageId});
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.put("/", async (req, res) => {
    const imagenes = await images.findAll();
    res.json(imagenes);
});
router.post("/", validateDto(imageDto), async (req, res) => {
    const body = req.body;
    if (body) {
        try {
          await images.create(body);
          res
            .status(200)
            .json({ message: "se ha registrado con exito la imagen" });
        } catch (error) {
          res.status(505).json({ error: "no se ha podido registrar: " + error });
        }
      }
});

module.exports = router;