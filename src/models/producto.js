const mongoose = require('mongoose');
const Usuario = require('./user');
const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    precioUnitario: { type: Number, required: true },
    Imagen: { type: String, required: false },
    usuarioId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }  
});


module.exports = mongoose.model('Producto', productoSchema);
