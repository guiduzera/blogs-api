const userServices = require('../services/userServices');
const tokenCreator = require('../helpers/tokenCreator');

const createUser = async (req, res) => {
    try {
        const result = await userServices.createUser(req.body);
        if (!result) {
            return res.status(409).json({ message: 'User already registered' });  
        }
        const token = tokenCreator(req.body.displayName);
        return res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error!' });
    }
};

module.exports = { createUser };