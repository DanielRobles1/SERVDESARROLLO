const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware'); 
const verifyGeolocation = require('../middleware/ipMiddleware');
// Crear una nueva orden
router.post('/',  orderController.createOrder); 

// Obtener todas las órdenes del usuario autenticado
router.get('/',  orderController.getUserOrders); 

// Obtener una orden específica
router.get('/:id',  orderController.getOrderById); 
module.exports = router;