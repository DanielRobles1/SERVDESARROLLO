const axios = require('axios');

const verifyGeolocation = async (req, res, next) => {
    try {
        console.log('Middleware verifyGeolocation ejecutándose...');

        const userIp = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0].trim() // Primera IP del encabezado
            : req.connection.remoteAddress;

        console.log('IP enviada a IPinfo.io:', userIp);

        // Si estamos en local, saltar validación de geolocalización
        if (userIp === '::1' || userIp === '127.0.0.1') {
            console.log('Acceso desde localhost detectado. Saltando validación de geolocalización.');
            return next();
        }

        const token = process.env.IPINFO_API_KEY || '802e02b9fa4ff1'; 
        const response = await axios.get(`https://ipinfo.io/${userIp}?token=${token}`);
        console.log('Respuesta completa de IPinfo.io:', response.data);

        const { country } = response.data;

        // Verificar si el país es México
        if (country !== 'MX') {
            console.log('Acceso denegado: La IP no pertenece a México.');
            return res.status(403).json({ message: 'Acceso denegado, solo se permite el acceso desde México' });
        }

        console.log('Acceso permitido: La IP pertenece a México.');
        next();
    } catch (error) {
        console.error('Error al verificar la ubicación:', error.message);
        res.status(500).json({ message: 'Error al verificar la ubicación' });
    }
};

module.exports = verifyGeolocation;
