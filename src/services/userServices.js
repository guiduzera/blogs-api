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

module.exports = {
    createUser,
};