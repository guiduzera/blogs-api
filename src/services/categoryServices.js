const { Category } = require('../database/models');

const createCategories = async (name) => Category.create({ name });

module.exports = { createCategories };