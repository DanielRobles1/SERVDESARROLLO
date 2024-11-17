const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Para evitar registros duplicados
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Definir roles disponibles
        default: 'user', // Asignar 'user' como valor predeterminado
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
