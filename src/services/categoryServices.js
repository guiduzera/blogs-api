const { Category } = require('../database/models');

const createCategories = async (name) => Category.create({ name });

const findAllCategories = async () => Category.findAll();

module.exports = { createCategories, findAllCategories };