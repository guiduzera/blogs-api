const userServices = require('../services/userServices');
const tokenCreator = require('../helpers/tokenCreator');

const ERROR = 'Internal server error!';

const adapting = (array) => {
    const newObj = array.map((user) => ({
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        image: user.image,
    }));
    return newObj;
};

const createUser = async (req, res) => {
    try {
        const result = await userServices.createUser(req.body);
        if (!result[0]) {
            return res.status(409).json({ message: 'User already registered' });  
        }
        const token = tokenCreator(result[1]);
        return res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ERROR });
    }
};

const findAllUsers = async (req, res) => {
    try {
        const result = await userServices.findAllUsers();
        return res.status(200).json(adapting(result));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: ERROR });
    }
};

const findUsersByPk = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userServices.findUsersByPk(id);
        if (!result) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const newObj = {
            id: result.id,
            displayName: result.displayName,
            email: result.email,
            image: result.image,
        };
        return res.status(200).json(newObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ERROR });
    }
};

module.exports = { createUser, findAllUsers, findUsersByPk };