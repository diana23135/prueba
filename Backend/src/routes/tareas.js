
const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const tasks = require('../models/tareas');

router.get("/", async (req, res) => {
    const taskId = req.params.id;
    if(taskId){
        const result = await tasks.findByPk(taskId);
        res.status(200).json(result);
    }
    res.status(404).json({error:"ERROR! No se encontro id"});
});
router.get("/get-all", async (req, res)=>{
    const tareas = await tasks.findAll();
    res.json(tareas);
});
router.delete("/", async (req, res) => {
    const taskId = req.params.id;
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
router.post("/", async (req, res) => {
    const tareas = await tasks.findAll();
    res.json(tareas);
});

module.exports = router;