const userSchema = require('./userSchema');

const validation = (obj) => {
    const result = userSchema.validate(obj);
    return result;
};

const userValidationMid = (req, res, next) => {
    const { error } = validation(req.body);
    if (error) {
        const [code, message] = error.message.split('|');
        return res.status(Number(code)).json({ message });
    }
    return next();
};

module.exports = userValidationMid;