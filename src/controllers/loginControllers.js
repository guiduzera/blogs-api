const loginServices = require('../services/loginServices');
const tokenCreator = require('../helpers/tokenCreator');

const getAllUsers = async (req, res) => {
    try {
        const result = await loginServices.getByEmail(req.body);
        if (!result) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        if (result.dataValues.password !== req.body.password) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        const token = tokenCreator(result.dataValues.id);
        return res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error!' });
    }
};

module.exports = { getAllUsers };