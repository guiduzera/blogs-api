const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');

const SECRET = process.env.JWT_SECRET || 'xablau';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const getAllUsers = async (req, res) => {
    const result = await loginServices.getByEmail(req.body);
    if (!result) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    if (result.dataValues.password !== req.body.password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ data: result.displayName }, SECRET, jwtConfig);
    return res.status(200).json({ token });
};

module.exports = { getAllUsers };