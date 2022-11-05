const router = require("express").Router();
const { UserAccess, AdminAccess } = require("../constant/constants");
const { authController } = require("../controller");

const { authMiddleware, checkRoleMiddleware } = require("../middleware");

router.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  authController.getUserGiveToken
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshTokenMiddleware,
  authController.refreshToken
);

module.exports = router;
