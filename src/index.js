const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path'); 
require('dotenv').config();
const userRoutes = require('./routers/user');
const productosRouter = require('./routers/productoarte');
const ordenRouter = require('./routers/oreden'); 
const ventaRouter =require('./routers/venta');
const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json());




app.use('/api/users', userRoutes);
app.use('/api/producto', productosRouter);
app.use('/api/orders', ordenRouter);
app.use('/api/ventas',ventaRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a Artesa'); // Mensaje de bienvenida
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error de conexión a MongoDB:', error));

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});