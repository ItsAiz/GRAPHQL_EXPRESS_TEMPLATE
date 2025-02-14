const jwt = require('jsonwebtoken');
const log = require('./logger');

const generateToken = (user) => {
    log.info('[generateToken]');
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const extractToken = (req) => {
    if (!req || !req.headers || !req.headers.authorization) {
        log.error('[extractToken] Missing authorization header');
        return '';
    }
    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith('Bearer ')) {
        log.error('[extractToken] Invalid authorization format');
        return '';
    }
    return authHeader.split(' ')[1];
};


const validateToken = (req) => {
    const token = extractToken(req);
    if (!token) return false;
    return jwt.verify(token, process.env.JWT_SECRET); 
};

module.exports = { generateToken, validateToken };