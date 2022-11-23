const router = require("express").Router();
const { UserAccess, AdminAccess } = require("../constant/constants");
const { userController } = require("../controller");
const {
  userMiddleware,
  authMiddleware: { checkAccessTokenMiddleware },
  checkRoleMiddleware,
  fileMiddleware,
} = require("../middleware");

router.get("/", checkAccessTokenMiddleware, userController.getAllUsers);

router.get("/:id", userController.getSingleUser);

router.put("/:id", userController.updateSingleUser);

router.delete("/:id", userController.deleteSingleUser);

router.post("/product");

router.post(
  "/",
  // fileMiddleware.checkFile,
  // fileMiddleware.checkAvatarLength,
  // fileMiddleware.checkDocumentLength,
  // fileMiddleware.checkVideoLength,
  userMiddleware.isLoginExisted,
  userMiddleware.isEmailCreated,
  userMiddleware.isUserValid,
  userController.createUser
);

module.exports = router;
