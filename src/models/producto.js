const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    precioUnitario: { type: Number, required: true },
    Imagen: { type: String, required: false },
    usuarioId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    }  
});


module.exports = mongoose.model('Producto', productoSchema);
