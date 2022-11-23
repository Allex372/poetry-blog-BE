const { Comment } = require("../dataBase/models");

module.exports = {
  //   findAllPosts: () => Post.find().sort({ createdAt: "desc" }),

  //   findAllPostsAndSort: (id) =>
  //     Post.aggregate([
  //       { $match: { userID: id } },
  //       { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
  //     ]),

  findCommentsOfCurrentPost: (postID) => Comment.find({ postID: postID }),

  //   findPostById: (id) => Post.findById(id),

  findCommentAndDelete: (id) => Comment.findByIdAndDelete({ _id: id }),

  createComment: (data) => Comment.create(data),

  //   updatePost: (id, data) => Post.updateOne({ _id: id }, { $set: data }),
};
