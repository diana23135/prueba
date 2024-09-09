
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
    const updatedFileds = ["nombreUsuario", "correo", "contraseña"];
        
    // Asegúrate de que el ID esté presente en la solicitud
    const userId = req.body.id;
    if (!userId) {
      return res.status(400).json({ error: "ID del usuario es requerido para la actualización" });
    }
  
    // Verifica los campos que se deben actualizar
    const values = Object.keys(req.body).filter(el => updatedFileds.includes(el));
    
    if (values.length === 0) {
      return res.status(400).json({ error: "No se puede actualizar; no se encontró ningún campo válido para actualizar" });
    }
    
    // Prepara el nuevo objeto de datos para actualizar
    const new_body = values.reduce((acc, el) => {
      acc[el] = req.body[el]; // Usa req.body en lugar de body
      return acc;
    }, {});
    
    try {
      // Actualiza el usuario en la base de datos
      const [affectedRows] = await User.update(new_body, {
        where: {
          id: userId
        }
      });
  
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      // Responde con éxito
      res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: "Error al actualizar el usuario" });
    }
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