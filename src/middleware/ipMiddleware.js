const axios = require('axios');

// Middleware para verificar la IP y ubicación geográfica
const verifyGeolocation = async (req, res, next) => {
    try {
        console.log('Middleware verifyGeolocation ejecutándose...');

        const userIp = req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for'].split(',')[0].trim() // Primera IP del encabezado
    : req.connection.remoteAddress;

console.log('IP enviada a ipstack:', userIp);


        // Si estamos en local, saltar validación de geolocalización
        if (userIp === '::1' || userIp === '127.0.0.1') {
            console.log('Acceso desde localhost detectado. Saltando validación de geolocalización.');
            return next();
        }

        // Hacer una solicitud a ipstack para verificar la geolocalización de la IP
        const response = await axios.get(
            `http://api.ipstack.com/${userIp}?access_key=${process.env.IPSTACK_API_KEY}`
        );
        console.log('Respuesta completa de ipstack:', response.data);
        
        // Extraer el código de país
        const { country_code } = response.data;

        // Verificar si el país es México
        if (country_code !== 'MX') {
            console.log('Acceso denegado: La IP no pertenece a México.');
            return res.status(403).json({ message: 'Acceso denegado, solo se permite el acceso desde México' });
        }

        console.log('Acceso permitido: La IP pertenece a México.');
        console.log('IP detectada para geolocalización:', userIp);

        next(); // Continuar al siguiente middleware o ruta
    } catch (error) {
        console.error('Error al verificar la ubicación:', error.message);
        res.status(500).json({ message: 'Error al verificar la ubicación' }); }
};

module.exports = verifyGeolocation;
