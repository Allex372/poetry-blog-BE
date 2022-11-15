const router = require("express").Router();
const { commentsController } = require("../controller");
const {
  userMiddleware,
  authMiddleware: { checkAccessTokenMiddleware },
  checkRoleMiddleware,
  fileMiddleware,
} = require("../middleware");

// router.get(
//   "/",
//   //  checkAccessTokenMiddleware,
//   postsController.getAllPosts
// );

router.post(
  "/",
  // checkAccessTokenMiddleware,
  commentsController.createComment
);

router.get(
  "/:id",
  //  checkAccessTokenMiddleware,
  commentsController.getCommentsByPostId
);

module.exports = router;
