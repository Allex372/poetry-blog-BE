const { Post } = require("../dataBase/models");

module.exports = {
  findAllPosts: () => Post.find().sort({ createdAt: "desc" }),

  findAllPostsAndSort: (id) =>
    Post.aggregate([
      { $match: { userID: id } },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    ]),

  findAllPostsOfCurrentUser: (userID) => Post.find({ userID: userID }),

  findPostById: (id) => Post.findById(id),

  deletePostById: (id) => Post.findByIdAndDelete({ _id: id }),

  createPost: (data) => Post.create(data),

  updatePost: (id, data) => Post.updateOne({ _id: id }, { $set: data }),
};
