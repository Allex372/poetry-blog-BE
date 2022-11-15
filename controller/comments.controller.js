const fs = require("fs-extra").promises;
const { commentsService } = require("../service");
const { errorCodes, emailActions } = require("../constant");
const { filePathBuider } = require("../helper");
const { errorMessages } = require("../error");

module.exports = {
  // getAllPosts: async (req, res, next) => {
  //   try {
  //     const posts = await postsService.findAllPosts();

  //     const responce = {
  //       data: posts,
  //       total: posts.length,
  //     };

  //     res.json(responce);
  //   } catch (e) {
  //     next(e);
  //   }
  // },

  // getAllPostsOfCurrentUser: async (req, res, next) => {
  //   try {
  //     const {
  //       params: { id },
  //     } = req;

  //     const posts = await postsService.findAllPostsOfCurrentUser(id);

  //     const responce = {
  //       data: posts,
  //     };

  //     res.json(responce);
  //   } catch (e) {
  //     next(e);
  //   }
  // },

  createComment: async (req, res, next) => {
    try {
      const { body } = req;

      await commentsService.createComment(body);

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  },

  getCommentsByPostId: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      const comments = await commentsService.findCommentsOfCurrentPost(id);

      res.json(comments);
    } catch (e) {
      res.json(e.message);
    }
  },
};
