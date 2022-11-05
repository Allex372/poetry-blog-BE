const fs = require("fs-extra").promises;
const { userService } = require("../service");
const { errorCodes, emailActions } = require("../constant");
const { filePathBuider } = require("../helper");
const { errorMessages } = require("../error");

module.exports = {
  getSingleUser: async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await userService.findUserById(userId);

      res.json(user);
    } catch (e) {
      res.json(e.message);
    }
  },
};
