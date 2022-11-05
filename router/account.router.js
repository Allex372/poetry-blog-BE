const router = require("express").Router();
const { UserAccess, AdminAccess } = require("../constant/constants");
const { accountController } = require("../controller");

const {
  authMiddleware,
  checkRoleMiddleware,
  authMiddleware: { checkAccessTokenMiddleware },
} = require("../middleware");

router.get("/", checkAccessTokenMiddleware, accountController.getSingleUser);

module.exports = router;
