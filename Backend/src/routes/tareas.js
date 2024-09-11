const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const tasks = require('../models/tareas');
const validateDto = require('../middlewares/validateDto');
const { taskDto } = require('../dtos/dtos');

/**
 * @swagger
 * tags:
 *   - name: Tareas
 *     description: Rutas relacionadas con la gestión de tareas
 */

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Obtiene tareas por ID de usuario
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del usuario cuyas tareas se desean obtener
 *     responses:
 *       200:
 *         description: Lista de tareas encontradas para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Tarea de ejemplo
 *                   descripcion:
 *                     type: string
 *                     example: Descripción de la tarea
 *                   fechaFinalizacion:
 *                     type: string
 *                     format: date
 *                     example: 2024-12-31
 *                   idEstados:
 *                     type: integer
 *                     example: 2
 *       404:
 *         description: No se encontró el ID del usuario
 *       500:
 *         description: Error interno del servidor
 */
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

    return res.status(404).json({ error: "ERROR! No se encontró el ID" }); // Use return to exit the function after sending the response
});

/**
 * @swagger
 * /tareas/get-all:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Tarea de ejemplo
 *                   descripcion:
 *                     type: string
 *                     example: Descripción de la tarea
 *                   fechaFinalizacion:
 *                     type: string
 *                     format: date
 *                     example: 2024-12-31
 *                   idEstados:
 *                     type: integer
 *                     example: 2
 */
router.get("/get-all", async (req, res) => {
    const tareas = await tasks.findAll();
    res.status(200).json(tareas);
});

/**
 * @swagger
 * /tareas:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito
 *       404:
 *         description: No se encontró el ID de la tarea
 */
router.delete("/", async (req, res) => {
    const taskId = req.query.id;
    if (taskId) {
        const result = await tasks.destroy({ where: { id: taskId } });
        if (result) {
            res.status(200).json({ message: "Se eliminó con éxito el ID: " + taskId });
        } else {
            res.status(404).json({ error: "ERROR! No se encontró la tarea" });
        }
    } else {
        res.status(400).json({ error: "ID de la tarea es requerido" });
    }
});

/**
 * @swagger
 * /tareas:
 *   put:
 *     summary: Actualiza una tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: Tarea actualizada
 *               descripcion:
 *                 type: string
 *                 example: Descripción actualizada de la tarea
 *               fechaFinalizacion:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-31
 *               idEstados:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       400:
 *         description: ID o campos inválidos para la actualización
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/", async (req, res) => {
    const updatedFields = ["nombre", "descripcion", "fechaFinalizacion", "idEstados"];
    
    // Asegúrate de que el ID esté presente en la solicitud
    const taskId = req.body.id;
    if (!taskId) {
        return res.status(400).json({ error: "ID de la tarea es requerido para la actualización" });
    }

    // Verifica los campos que se deben actualizar
    const values = Object.keys(req.body).filter(el => updatedFields.includes(el));

    if (values.length === 0) {
        return res.status(400).json({ error: "No se puede actualizar; no se encontró ningún campo válido para actualizar" });
    }

    // Prepara el nuevo objeto de datos para actualizar
    const newBody = values.reduce((acc, el) => {
        acc[el] = req.body[el];
        return acc;
    }, {});

    try {
        // Actualiza la tarea en la base de datos
        const [affectedRows] = await tasks.update(newBody, {
            where: {
                id: taskId
            }
        });

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        res.status(200).json({ message: "Tarea actualizada correctamente" });
    } catch (err) {
        console.error('Error al actualizar la tarea:', err);
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
});

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Nueva tarea
 *               descripcion:
 *                 type: string
 *                 example: Descripción de la nueva tarea
 *               fechaFinalizacion:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-31
 *               idEstados:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Tarea registrada con éxito
 *       505:
 *         description: Error al registrar la tarea
 */
router.post("/", validateDto(taskDto), async (req, res) => {
    const body = req.body;
    if (body) {
        try {
            await tasks.create(body);
            res.status(200).json({ message: "Se ha registrado con éxito la tarea" });
        } catch (error) {
            res.status(505).json({ error: "No se ha podido registrar: " + error });
        }
    }
});

module.exports = router;
