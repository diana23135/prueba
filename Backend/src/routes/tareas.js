
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const tasks = require('../models/tareas');
const validateDto = require('../middlewares/validateDto');
const {taskDto} = require('../dtos/dtos');
router.get("/", async (req, res) => {
    const taskId = req.query.id;
    if (taskId) {
        try {
            const result = await tasks.findAll({ where: { idUsuario: taskId } });
            return res.status(200).json(result); // Use return to exit the function after sending the response
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' }); // Handle any potential errors
        }
    }

    return res.status(404).json({ error: "ERROR! No se encontro id" }); // Use return to exit the function after sending the response
});

router.get("/get-all", async (req, res)=>{
    const tareas = await tasks.findAll();
    res.json(tareas);
});
router.delete("/", async (req, res) => {
    const taskId = req.query.id;
    if(taskId){
        await tasks.destroy({where:{id:taskId}});
        res.status(200).json({message: "Se elimino con exito el id: " + taskId});
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.put("/", async (req, res) => {
    const tareas = await tasks.findAll();
    res.json(tareas);
});
router.post("/", validateDto(taskDto), async (req, res) => {
    const body = req.body;
    if (body) {
        try {
          await tasks.create(body);
          res
            .status(200)
            .json({ message: "se ha registrado con exito la tarea" });
        } catch (error) {
          res.status(505).json({ error: "no se ha podido registrar: " + error });
        }
      }
});

module.exports = router;