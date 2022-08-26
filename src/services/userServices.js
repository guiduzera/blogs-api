const { User } = require('../database/models');

const createUser = async ({ displayName, email, password, image }) => {
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
        return false;
    }
    await User.create({
        displayName,
        email,
        password,
        image,
    });
    return true;
};

const findAllUsers = async () => User.findAll();

const findUsersByPk = async (params) => User.findByPk(params);

module.exports = {
    createUser,
    findAllUsers,
    findUsersByPk,
};