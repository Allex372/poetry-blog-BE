const { Post } = require("../dataBase/models");

module.exports = {
  findAllPosts: () => Post.find(),

  findAllPostsAndSort: () =>
    Post.aggregate([
      { $group: { _id: { $month: "$createdAt" }, total: { $sum: 1 } } },
    ]),

  findPostById: (id) => Post.findById(id),

  createPost: (data) => Post.create(data),

  updatePost: (id, data) => Post.updateOne({ _id: id }, { $set: data }),
};
