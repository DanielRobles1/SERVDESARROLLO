const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware'); 
const verifyGeolocation = require('../middleware/ipMiddleware');

// Ruta para registrar usuario
router.post('/register',verifyGeolocation, userController.register);

// Ruta para iniciar sesión
router.post('/login', verifyGeolocation, userController.login);

// Ruta para obtener perfil de usuario (requiere autenticación y geolocalización)
router.get('/profile/:id', authMiddleware('user'), verifyGeolocation, userController.getProfile);

// Ruta para admin (requiere autenticación y geolocalización)
router.get('/', authMiddleware(), verifyGeolocation, userController.list);

// Ruta para eliminar usuario (requiere autenticación y geolocalización)
router.delete('/:id', authMiddleware(), verifyGeolocation, userController.deleteus);

// Ruta para actualizar información de usuario (requiere autenticación y geolocalización)
router.patch('/:id', authMiddleware(), verifyGeolocation, userController.actuauser);

module.exports = router;
