
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const user = require('../models/usuarios');
const validateDto = require('../middlewares/validateDto');
const {userDto} = require('../dtos/dtos');

const {loginDto} = require('../dtos/dtos');


router.get("/", async (req, res) => {
    const userId = req.query.id;
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
    const userId = req.query.id;
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
        const email = body.correo;
          const usuario = await user.findOne({ where: { correo: email } });

          if (usuario) {
              return res.status(401).json({ error: "Usuario ya esta registrado" });
          }
          await user.create(body);
          res
            .status(200)
            .json({ message: "se ha registrado con exito el usuario" });
        } catch (error) {
          res.status(505).json({ error: "no se ha podido registrar: " + error });
        }
      }
});


router.post("/login", validateDto(loginDto), async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(404).json({ error: "no se ha encontrado un body" });
    }

    const email = body.correo;
    const pass = body.contraseña;

    try {
        // Aquí se busca el usuario solo por correo
        const usuario = await user.findOne({ where: { correo: email } });

        if (!usuario) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        // Aquí puedes hacer la verificación de la contraseña con bcrypt, si usas hash:
        // const isPasswordValid = await bcrypt.compare(pass, usuario.contraseña);
        const isPasswordValid = (usuario.contraseña === pass); // En caso de que no uses hashing

        if (isPasswordValid) {
            return res.status(202).json(usuario);
        } else {
            return res.status(401).json({ error: "no se ha podido autenticar" });
        }
    } catch (error) {
        return res.status(500).json({ error: "no se ha podido conectar con el servidor: " + error });
    }
});


module.exports = router;