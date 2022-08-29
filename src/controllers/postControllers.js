const postServices = require('../services/postServices');

const createNewPost = async (req, res) => {
    try {
        const result = await postServices.createNewPost(req.body, req.displayName);
        if (!result[0]) return res.status(400).json({ message: '"categoryIds" not found' });
        const findPost = await postServices.findPostByPk(result[1]);
        res.status(201).json(findPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const findAllInfosPost = async (req, res) => {
    try {
        const result = await postServices.findAllInfosPost();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { createNewPost, findAllInfosPost };