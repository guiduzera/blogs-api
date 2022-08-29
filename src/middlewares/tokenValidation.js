const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'xablau';

const validationToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(authorization, SECRET);
        req.id = decoded.data;
        if (decoded) return next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = validationToken;