const express = require("express");
const aws3 = require("../services/s3Service")
const router = express.Router(); // creo el objeto de tipo router
const images = require('../models/imagenes');
const validateDto = require('../middlewares/validateDto');
const { imageDto } = require('../dtos/dtos');

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
    const taskId = req.query.id;
    if (taskId) {
        const result = images.findAll({ where: { idTarea: taskId } });
        if (result) {
            
            image = aws3.getImage(result.nombreImagen);
            finalResult = { ...image, ...result };
            res.status(200).json(finalResult);
        } else {
            res.status(404).json({ error: "ERROR! No se encontró la imagen" });
        }
    } else {
        res.status(400).json({ error: "ID de la tarea es requerido" });
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
    const imagenes = await images.findAll();
    res.status(200).json(imagenes);
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
    const imageId = req.query.id;
    if (imageId) {
        const image = images.findByPk(imageId);
        if (image){
          const result = await images.destroy({ where: { id: imageId } });
          aws3.deleteImage(image.nombreImagen);
          if (result) {
              res.status(200).json({ message: "Se eliminó con éxito el ID: " + imageId });
          } 
        }
        res.status(404).json({ error: "ERROR! No se encontró la imagen" });
        
        
    } else {
        res.status(400).json({ error: "ID de la imagen es requerido" });
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
router.put("/", async (req, res) => {
    const updatedFields = ["nombreImagen", "ruta"];
    const imgId = req.body.id;

    if (!imgId) {
        return res.status(400).json({ error: "ID de la imagen es requerido para la actualización" });
    }

    const values = Object.keys(req.body).filter(el => updatedFields.includes(el));

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
        const [affectedRows] = await images.update(newBody, {
            where: {
                id: imgId
            }
        });

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Imagen no encontrada" });
        }

        res.status(200).json({ message: "Imagen actualizada correctamente" });
    } catch (err) {
        console.error('Error al actualizar la imagen:', err);
        res.status(500).json({ error: "Error al actualizar la imagen" });
    }
});


router.post("/", validateDto(imageDto), async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      const awsBody = {
        fileName : body.nombreImagen,
        fileBase64 : body.fileBase64
      };
      delete body.fileBase64;
      await states.create(body);
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
