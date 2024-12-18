const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productos: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },          
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: false },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);