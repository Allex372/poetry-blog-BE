const fs = require("fs-extra").promises;
const { postsService } = require("../service");
const { errorCodes, emailActions } = require("../constant");
const { filePathBuider } = require("../helper");
const { errorMessages } = require("../error");
const cloudinary = require("cloudinary");

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
        // files: { picture },
      } = req;

      const post = await postsService.createPost(body);

      if (body.picture) {
        // const { finalFilePath, uploadPath, fileDir } =
        //   filePathBuider.fileBuilderPath(picture.name, "photos", post._id);

        // await fs.mkdir(fileDir, { recursive: true });

        // await picture.mv(finalFilePath);

        await postsService.updatePost(post._id, { picture: body.picture });
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

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });

      const postToDelete = await postsService.findPostById(id);

      await cloudinary.v2.uploader.destroy(
        postToDelete.photoPublicId,
        async (err, result) => {
          if (err) throw err;
          res.json("Deleted");
        }
      );

      await postsService.deletePostById(id);

      res.json(200);
    } catch (e) {
      res.json(e.message);
    }
  },
};
