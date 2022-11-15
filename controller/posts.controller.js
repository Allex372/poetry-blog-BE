const fs = require("fs-extra").promises;
const { postsService } = require("../service");
const { errorCodes, emailActions } = require("../constant");
const { filePathBuider } = require("../helper");
const { errorMessages } = require("../error");

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await postsService.findAllPosts();

      const responce = {
        data: posts,
        total: posts.length,
      };

      res.json(responce);
    } catch (e) {
      next(e);
    }
  },

  getAllPostsStatistic: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;

      console.log(id);
      const posts = await postsService.findAllPostsAndSort(id);

      const responce = {
        data: posts,
      };

      res.json(responce);
    } catch (e) {
      next(e);
    }
  },

  getAllPostsOfCurrentUser: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;

      const posts = await postsService.findAllPostsOfCurrentUser(id);

      const responce = {
        data: posts,
      };

      res.json(responce);
    } catch (e) {
      next(e);
    }
  },

  createPost: async (req, res, next) => {
    try {
      const {
        body,
        files: { picture },
      } = req;

      const post = await postsService.createPost(body);

      if (picture) {
        const { finalFilePath, uploadPath, fileDir } =
          filePathBuider.fileBuilderPath(picture.name, "photos", post._id);

        await fs.mkdir(fileDir, { recursive: true });

        await picture.mv(finalFilePath);

        await postsService.updatePost(post._id, { picture: uploadPath });
      }

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  },

  deletePostById: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      await postsService.deletePostById(id);

      res.json(200);
    } catch (e) {
      res.json(e.message);
    }
  },
};
