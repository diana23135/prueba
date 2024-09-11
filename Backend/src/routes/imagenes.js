const express = require("express");
const aws3 = require("../services/s3Service");
const router = express.Router(); // creo el objeto de tipo router
const images = require("../models/imagenes");
const task = require("../models/tareas");
const validateDto = require("../middlewares/validateDto");
const { imageDto, imageEditDto } = require("../dtos/dtos");

/**
 * @swagger
 * tags:
 *   - name: Imágenes
 *     description: Rutas relacionadas con la gestión de imágenes
 */

/**
 * @swagger
 * /imagenes:
 *   get:
 *     summary: Obtiene una imagen por ID
 *     tags: [Imágenes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID de la imagen a obtener
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombreImagen:
 *                   type: string
 *                   example: Imagen de ejemplo
 *                 ruta:
 *                   type: string
 *                   example: /imagenes/ejemplo.jpg
 *       404:
 *         description: No se encontró el ID
 */
router.get("/", async (req, res) => {
  const taskId = req.query.idTask;
  const userId = req.query.idUser;
  const fileName = req.query.fileName;
  if (taskId && userId && fileName) {
    const result = await images.findAll({ where: { idTarea: taskId } });
    if (result) {
      image = aws3.getImage(userId, taskId, fileName);
      finalResult = { ...image, ...result };
      res.status(200).json(finalResult);
    } else {
      res.status(404).json({ error: "ERROR! No se encontró la imagen" });
    }
  } else {
    res.status(400).json({ error: "los id son necesarios" });
  }
});

/**
 * @swagger
 * /imagenes/get-all:
 *   get:
 *     summary: Obtiene todas las imágenes
 *     tags: [Imágenes]
 *     responses:
 *       200:
 *         description: Lista de imágenes
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
 *                   nombreImagen:
 *                     type: string
 *                     example: Imagen de ejemplo
 *                   ruta:
 *                     type: string
 *                     example: /imagenes/ejemplo.jpg
 */
router.get("/get-all", async (req, res) => {
    const userId = req.query.idUser;
  
    if (userId) {
      try {
        // Buscar tareas asociadas al usuario
        const tasks = await task.findAll({ where: { idUsuario: userId } });
  
        if (tasks.length === 0) {
          return res.status(400).json({ error: "No se encuentran tareas asociadas a este usuario" });
        }
  
        let imagenes = [];
  
        // Buscar imágenes asociadas a cada tarea
        for (const t of tasks) {
          const imagenesPorTarea = await images.findAll({
            where: { idTarea: t.id },
          });
          imagenes.push(...imagenesPorTarea);
        }
  
        // Obtener imágenes desde AWS (suponiendo que aws3.getAll es asíncrono)
        const awsImages = await aws3.getAll(userId);
        console.log(awsImages);
        // Crear un mapa de base64 con id_tarea como clave
        const base64Map = awsImages.reduce((map, image) => {
          const match = image.file_name.match(/\/(\d+)\//);
          if (match) {
            const idTarea = match[1];
            map[idTarea] = image.file_content_base64; // Asume que base64 es el campo correcto
          }
          return map;
        }, {});
  
        // Actualizar la primera lista con el base64 correspondiente
        const tareasConBase64 = imagenes.map((imagen) => {
          const base64 = base64Map[imagen.idTarea] || null; // Obtiene el base64 o null si no hay coincidencia
          return { ...imagen, base64 };
        });
  
        console.log(tareasConBase64);
        res.status(200).json(tareasConBase64);
      } catch (error) {
        console.error(error); // Agrega esto para depurar errores
        res.status(500).json({ error: "Error en el servidor" });
      }
    } else {
      res.status(400).json({ error: "userId es obligatorio" });
    }
  });
  

/**
 * @swagger
 * /imagenes:
 *   delete:
 *     summary: Elimina una imagen por ID
 *     tags: [Imágenes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID de la imagen a eliminar
 *     responses:
 *       200:
 *         description: Imagen eliminada con éxito
 *       404:
 *         description: No se encontró el ID
 */
router.delete("/", async (req, res) => {
  const taskId = req.query.idTask;
  const userId = req.query.idUser;
  const fileName = req.query.fileName;
  if (taskId && userId && fileName) {
    const result = await images.destroy({ where: { idTarea: taskId } });
    if (result) {
      image = aws3.deleteImage(userId, taskId, fileName);

      res.status(200).json(finalResult);
    } else {
      res.status(404).json({ error: "ERROR! No se pudo eliminar la imagen" });
    }
  } else {
    res.status(400).json({ error: "los id son necesarios" });
  }
});

/**
 * @swagger
 * /imagenes:
 *   put:
 *     summary: Actualiza una imagen
 *     tags: [Imágenes]
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
 *               nombreImagen:
 *                 type: string
 *                 example: Imagen actualizada
 *               ruta:
 *                 type: string
 *                 example: /imagenes/actualizada.jpg
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       400:
 *         description: ID o campos inválidos para la actualización
 *       404:
 *         description: Imagen no encontrada
 */
router.put("/", validateDto(imageEditDto), async (req, res) => {
  try {
    const awsBody = {
      user_id: body.user_id,
      task_id: body.task_id,
      image_name: body.image_name,
      fileBase64: body.fileBase64,
    };
    aws3.editImage(awsBody);

    res.status(200).json({ message: "Imagen actualizada correctamente" });
  } catch (err) {
    console.error("Error al actualizar la imagen:", err);
    res.status(500).json({ error: "Error al actualizar la imagen" });
  }
});

router.post("/", validateDto(imageDto), async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      const awsBody = {
        user_id: body.idUser,
        task_id: body.idTarea,
        image_name: body.nombreImagen,
        fileBase64: body.fileBase64,
      };

      body.ruta = `${body.idUser}/${body.idTask}/${body.nombreImagen}`;
      delete body.fileBase64;
      await images.create(body);
      aws3.insertImage(awsBody);
      res.status(200).json({ message: "Se ha registrado con éxito la imagen" });
    } catch (error) {
      res.status(505).json({ error: "No se ha podido registrar: " + error });
    }
  } else {
    res.status(400).json({ error: "Datos de la imagen son requeridos" });
  }
});

module.exports = router;
