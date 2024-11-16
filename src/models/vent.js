const mongoose = require('mongoose');

const ventSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idVenta: { type: String, required: true, unique: true },
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precioUnitario: { type: Number, required: true },
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

ventSchema.pre('save', function (next) {
    if (!this.unidVenta) {
        this.unidVenta = `VENTA-${Date.now()}`;
    }
    next();
});
module.exports = mongoose.model('vent', ventSchema);
