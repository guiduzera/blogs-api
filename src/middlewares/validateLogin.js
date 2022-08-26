const loginSchema = require('./loginSchema');

const validate = (schema) => {
    const isValid = loginSchema.validate(schema);
    return isValid;
};

const validateLoginMiddleware = (req, res, next) => {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return next();
};

module.exports = validateLoginMiddleware;