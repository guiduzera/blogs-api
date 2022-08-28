const categoryServices = require('../services/categoryServices');

const createCategories = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: '"name" is required' });
        const resultCreate = await categoryServices.createCategories(name);
        return res.status(201).json(resultCreate);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const findAllCategories = async (req, res) => {
    try {
        const result = await categoryServices.findAllCategories();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { createCategories, findAllCategories };