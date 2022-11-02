const fs = require("fs-extra").promises;
const { postsService } = require("../service");
const { errorCodes, emailActions } = require("../constant");
const { filePathBuider } = require("../helper");
const { errorMessages } = require("../error");

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await postsService.findAllPosts();

      res.json(posts);
    } catch (e) {
      next(e);
    }
  },

  // getSingleUser: async (req, res) => {
  //     try {
  //         const userId = req.params.id;
  //
  //         const user = await userService.findUserById(userId);
  //
  //         res.json(user);
  //     } catch (e) {
  //         res.json(e.message);
  //     }
  // },

  createPost: async (req, res, next) => {
    try {
      const { body, files: { picture } } = req;

      const post = await postsService.createPost(body);

      if (picture) {

        // console.log(picture);
        // eslint-disable-next-line max-len
        const { finalFilePath, uploadPath, fileDir } = filePathBuider.fileBuilderPath(picture.name, 'photos', post._id);

        await fs.mkdir(fileDir, { recursive: true });

        await picture.mv(finalFilePath);

        await postsService.updatePost(post._id, { picture: uploadPath });
    }
      // for (const photo of photos) {
      //   // const { finalFilePath, uploadPath, fileDir } =
      //   //   filePathBuider.fileBuilderPath(
      //   //     photo.name,
      //   //     "photos",
      //   //     createdProduct._id
      //   //   );

      //   // await fs.mkdir(fileDir, { recursive: true });

      //   // await photo.mv(finalFilePath);
      //   const PathWithoutStatic = path.join("post", `${post._id}`, "photos");
      //   const photoDir = path.join(process.cwd(), "static", PathWithoutStatic);
      //   const fileExtension = photo.name.split(".").pop();
      //   const photoName = `${uuid()}.${fileExtension}`;
      //   const finalPhotoPath = path.join(photoDir, photoName);

      //   await fs.mkdir(photoDir, { recursive: true });

      //   await photo.mv(finalPhotoPath);

      //   await productService.updatePost(post._id, {
      //     pic: path.join(photoDir, photoName),
      //   });
      // }

      // await emailService.sendMail(email, emailActions.WELCOME, {userName: name});

      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  },

  deleteSingleUser: async (req, res) => {
    try {
      const userId = req.params.id;
      //
      // const user = await userService.findUserById(userId);
      //
      // const { email, name } = user;

      // await userService.deleteSingleUser(userId);
      //
      // await emailService.sendMail(email, emailActions.USER_DELETED, { userName: name });

      res.json(`${name} was deleted`);
    } catch (e) {
      res.json(e.message);
    }
  },
};
