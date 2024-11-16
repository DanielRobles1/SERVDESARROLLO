const Venta = require('../models/vent');

// Creamos una nueva venta
exports.createVenta = async (req, res) => {
    const { producto, cantidad, precioUnitario } = req.body;
    const total = cantidad * precioUnitario;

    const nuevaVenta = new Venta({
        userId: req.user.id, // ID del usuario autenticado para poder hacer la compra
        producto,
        cantidad,
        precioUnitario,
        total
    });

    try {
        const savedVenta = await nuevaVenta.save();
        res.status(201).json(savedVenta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las ventas del usuario autenticado
exports.getUserVentas = async (req, res) => {
    try {
        const ventas = await Venta.find({ userId: req.user.id });
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una venta específica
exports.getVentaById = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id);
        if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una venta
exports.deleteVenta = async (req, res) => {
    try {
        const venta = await Venta.findByIdAndDelete(req.params.id);
        if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
        res.json({ message: 'Venta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
