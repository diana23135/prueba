
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const user = require('../models/usuarios');
const validateDto = require('../middlewares/validateDto');
const {userDto} = require('../dtos/dtos');

router.get("/", async (req, res) => {
    const userId = req.params.id;
    if(userId){
        const result = await user.findByPk(userId);
        res.status(200).json(result);
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.get("/get-all", async (req, res) => {
    const usuarios = await user.findAll();
    res.json(usuarios);
});
router.delete("/", async (req, res) => {
    const userId = req.params.id;
    if(userId){
        await user.destroy({where:{id:userId}});
        res.status(200).json({message: "Se elimino con exito el id: " + userId});
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.put("/", async(req, res) => {
    const body = req.body; 
    if(body){ 
        res.status(200).json({message: "Se actualizo con exito el id: " + userId});
    }
    res.status(404).json({error:"ERROR! No se encontro body"});
});
router.post("/", validateDto(userDto), async (req, res) => {
    const body = req.body;
    if (body) {
        try {
          await user.create(body);
          res
            .status(200)
            .json({ message: "se ha registrado con exito el usuario" });
        } catch (error) {
          res.status(505).json({ error: "no se ha podido registrar: " + error });
        }
      }
});

module.exports = router;