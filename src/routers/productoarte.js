const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get
// Obtener todas las artesanías
router.get('/', productController.getAllProducts);

// Crear una nueva artesanía
router.post('/', productController.createProduct);

// Obtener artesanía por su ID
router.get('/:id', productController.getProductById);

// Actualizar una artesanía por ID
router.put('/:id', productController.updateProductById);

// Eliminar artesanía por ID
router.delete('/:id', productController.deleteProductById); //Hace falta que exista un middleware que verifique que el producto a eliminar sea de el

module.exports = router;
