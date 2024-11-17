const Producto = require('../models/producto');

// Obtener todas las artesanías
exports.getAllProducts = async (req, res) => {
    try {
        const productos = await Producto.find().populate('usuarioId', 'nombre'); 
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva artesanía
exports.createProduct = async (req, res) => {
    const { nombre, descripcion, precioUnitario, Imagen, usuarioId } = req.body;

    if (!usuarioId) {
        return res.status(400).json({ message: 'El campo usuarioId es obligatorio' });
    }

    const product = new Producto({
        nombre,
        descripcion,
        precioUnitario,
        Imagen,
        usuarioId
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener artesanía por su ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Producto.findById(req.params.id).populate('usuarioId', 'nombre');
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una artesanía por ID
exports.updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar artesanía por ID
exports.deleteProductById = async (req, res) => {
    try {
        const removedProduct = await Producto.findByIdAndDelete(req.params.id);
        if (!removedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
