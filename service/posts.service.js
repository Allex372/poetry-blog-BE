const { Post } = require("../dataBase/models");
const { Types } = require("mongoose");

module.exports = {
  findAllPosts: () =>
    Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postID",
          as: "comments",
        },
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userID",
          foreignField: "_id",
          as: "comments.user",
        },
      },
      {
        $unwind: {
          path: "$comments.user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          text: { $first: "$text" },
          picture: { $first: "$picture" },
          userID: { $first: "$userID" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          userName: { $first: "$userName" },
          photoPublicId: { $first: "$photoPublicId" },
          comments: {
            $push: "$comments",
          },
          user: { $first: "$user" },
        },
      },
      { $sort: { createdAt: -1 } },
    ]),

  findAllPostsAndSort: (id) =>
    Post.aggregate([
      { $match: { userID: Types.ObjectId(id) } },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
    ]),

  findAllPostsOfCurrentUser: (userID) =>
    Post.aggregate([
      { $match: { userID: Types.ObjectId(userID) } },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postID",
          as: "comments",
        },
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userID",
          foreignField: "_id",
          as: "comments.user",
        },
      },
      {
        $unwind: {
          path: "$comments.user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          text: { $first: "$text" },
          picture: { $first: "$picture" },
          userID: { $first: "$userID" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          userName: { $first: "$userName" },
          comments: {
            $push: "$comments",
          },
          user: { $first: "$user" },
        },
      },
      { $sort: { createdAt: -1 } },
    ]),

  findPostById: (id) => Post.findById(id),

  deletePostById: (id) => Post.findByIdAndDelete({ _id: id }),

  createPost: (data) => Post.create(data),

  updatePost: (id, data) => Post.updateOne({ _id: id }, { $set: data }),
};
