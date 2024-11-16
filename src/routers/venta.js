const express = require('express');
const { createVenta, getUserVentas, getVentaById, deleteVenta } = require('../controllers/ventasController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 


// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Crear una nueva venta
router.post('/', createVenta);

// Obtener todas las ventas del usuario autenticado
router.get('/', getUserVentas);

// Obtener una venta específica por ID
router.get('/:id', getVentaById);

// Eliminar una venta específica
router.delete('/:id', deleteVenta);

module.exports = router;
