const express = require("express");
const router = express.Router(); // creo el objeto de tipo router
const states = require("../models/estados");
const validateDto = require("../middlewares/validateDto");
const { stateDto } = require("../dtos/dtos");

/**
 * @swagger
 * tags:
 *   - name: Estados
 *     description: Rutas relacionadas con la gestión de estados
 */

/**
 * @swagger
 * /estados:
 *   get:
 *     summary: Obtiene un estado por ID
 *     tags: [Estados]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del estado a obtener
 *     responses:
 *       200:
 *         description: Estado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombreEstados:
 *                   type: string
 *                   example: Activo
 *       404:
 *         description: No se encontró el ID
 */
router.get("/", async (req, res) => {
  const stateId = req.query.id;
  if (stateId) {
    const result = await states.findByPk(stateId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "ERROR! No se encontró el estado" });
    }
  } else {
    res.status(400).json({ error: "ID del estado es requerido" });
  }
});

/**
 * @swagger
 * /estados/get-all:
 *   get:
 *     summary: Obtiene todos los estados
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Lista de estados
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
 *                   nombreEstados:
 *                     type: string
 *                     example: Activo
 */
router.get("/get-all", async (req, res) => {
  const estados = await states.findAll();
  res.status(200).json(estados);
});

/**
 * @swagger
 * /estados:
 *   delete:
 *     summary: Elimina un estado por ID
 *     tags: [Estados]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del estado a eliminar
 *     responses:
 *       200:
 *         description: Estado eliminado con éxito
 *       404:
 *         description: No se encontró el ID
 */
router.delete("/", async (req, res) => {
  const stateId = req.query.id;
  if (stateId) {
    const result = await states.destroy({ where: { id: stateId } });
    if (result) {
      res.status(200).json({ message: "Se eliminó con éxito el estado con ID: " + stateId });
    } else {
      res.status(404).json({ error: "ERROR! No se encontró el estado" });
    }
  } else {
    res.status(400).json({ error: "ID del estado es requerido" });
  }
});

/**
 * @swagger
 * /estados:
 *   put:
 *     summary: Actualiza un estado
 *     tags: [Estados]
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
 *               nombreEstados:
 *                 type: string
 *                 example: Activo
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: ID o campos inválidos para la actualización
 *       404:
 *         description: Estado no encontrado
 */
router.put("/", async (req, res) => {
  const updatedFields = ["nombreEstados"];
  const stateId = req.body.id;

  if (!stateId) {
    return res.status(400).json({ error: "ID del estado es requerido para la actualización" });
  }

  const values = Object.keys(req.body).filter((el) => updatedFields.includes(el));

  if (values.length === 0) {
    return res.status(400).json({
      error: "No se puede actualizar; no se encontró ningún campo válido para actualizar",
    });
  }

  const newBody = values.reduce((acc, el) => {
    acc[el] = req.body[el];
    return acc;
  }, {});

  try {
    const [affectedRows] = await states.update(newBody, {
      where: { id: stateId },
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Estado no encontrado" });
    }

    res.status(200).json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar el estado:", err);
    res.status(500).json({ error: "Error al actualizar el estado" });
  }
});

/**
 * @swagger
 * /estados:
 *   post:
 *     summary: Crea un nuevo estado
 *     tags: [Estados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreEstados:
 *                 type: string
 *                 example: Activo
 *     responses:
 *       200:
 *         description: Estado registrado con éxito
 *       505:
 *         description: Error al registrar el estado
 */
router.post("/", validateDto(stateDto), async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      await states.create(body);
      res.status(200).json({ message: "Se ha registrado con éxito el estado" });
    } catch (error) {
      res.status(505).json({ error: "No se ha podido registrar: " + error });
    }
  } else {
    res.status(400).json({ error: "Datos del estado son requeridos" });
  }
});

module.exports = router;
