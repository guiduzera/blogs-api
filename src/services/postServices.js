const { BlogPost, Category, PostCategory, User } = require('../database/models');

const createInPostCategories = async (Pid, Cids) => {
    Cids.forEach(async (element) => {
        await PostCategory.create(
            { postId: Pid, categoryId: element },
        );
    });
    return [true, Pid];
};

const createNewPost = async (body, displayName) => {
    const user = await User.findOne({ where: { displayName } });
    const createBlogPost = await BlogPost.create({
        title: body.title,
        content: body.content,
        userId: user.dataValues.id,
        published: new Date(),
        updated: new Date(),
    });
    const category = await Promise.all(body.categoryIds.map(async (element) => {
        const findCategory = await Category.findByPk(element);
        if (!findCategory) return false;
        return true;
    }));
    const isValid = category.every((i) => i === false);
    if (isValid) return false;
    return createInPostCategories(createBlogPost.dataValues.id, body.categoryIds);
};

const findPostByPk = async (pk) => {
    const result = await BlogPost.findByPk(pk);
    return result.dataValues;
};

module.exports = { createNewPost, findPostByPk };

// const a = {
//     title: 'Latest updates, August 1st',
//     content: 'The whole text for the blog post goes here in this key',
//     categoryIds: [1, 2],
// };