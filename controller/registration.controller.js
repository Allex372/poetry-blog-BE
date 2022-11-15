const { registrationService, emailService } = require("../service");
const { passwordHelper } = require("../helper");
const { emailActions } = require("../constant");
const { errorMessage } = require("../textMessages");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashPassword = await passwordHelper.hash(password);

      await registrationService.createUser({
        ...req.body,
        password: hashPassword,
      });

      // await emailService.sendMail(email, emailActions.WELCOME, { userName: login });
      const data = {
        status: 200,
      };

      res.json(data);

      next();
    } catch (e) {
      next(e);
    }
  },
};
