const jwt = require('jsonwebtoken');

// Middleware para proteger rutas
const verifyToken = (role = 'user') => {
    return (req, res, next) => {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json({ message: 'Acceso denegado' });

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;

            // Verificar si el rol del usuario coincide con el rol requerido
            if (role && req.user.role !== role && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Acceso denegado, permisos insuficientes' });
            }
            
            next();
        } catch (error) {
            res.status(400).json({ message: 'Token inválido' });
        }
    };
};

module.exports = verifyToken;
