const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'xablau';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const tokenCreator = (payload) => {
    const token = jwt.sign({ data: payload }, SECRET, jwtConfig);
    return token;
};

module.exports = tokenCreator;