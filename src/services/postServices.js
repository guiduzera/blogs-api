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

const findAllInfosPost = async () => {
    const allInfosPost = await BlogPost.findAll({
        include: [{
            model: User,
            as: 'user',
            attributes: {
              exclude: ['password'],
            },
          }, {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        },
        ],
      });
    return allInfosPost;
};

const findOneInfosPost = async (id) => {
    const OneInfoPost = await BlogPost.findOne({
        where: { id },
        include: [{
            model: User,
            as: 'user',
            attributes: {
                exclude: ['password'],
            },
        }, {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        }],
    });
    return OneInfoPost;
};

module.exports = { createNewPost, findPostByPk, findAllInfosPost, findOneInfosPost };