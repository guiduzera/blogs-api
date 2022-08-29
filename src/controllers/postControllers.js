const postServices = require('../services/postServices');

const createNewPost = async (req, res) => {
    try {
        const result = await postServices.createNewPost(req.body, req.id);
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

const findOneInfosPost = async (req, res) => {
    try {
        const result = await postServices.findOneInfosPost(req.params.id);
        if (!result) return res.status(404).json({ message: 'Post does not exist' });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const result = await postServices.updatePost(req.body, req.params, req.id);
        if (!result) return res.status(401).json({ message: 'Unauthorized user' });
        const post = await postServices.findOneInfosPost(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
       const result = await postServices.deletePost(req.params, req.id);
       if (result === false) return res.status(204).json();
       const { message, code } = result;
       return res.status(code).json({ message });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const findByQuery = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            const all = await postServices.findAllInfosPost();
            return res.status(200).json(all);
        }
        const result = await postServices.findByQuery(q);
        if (!result) return res.status(200).json([]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    createNewPost,
    findAllInfosPost,
    findOneInfosPost,
    updatePost,
    deletePost,
    findByQuery,
};