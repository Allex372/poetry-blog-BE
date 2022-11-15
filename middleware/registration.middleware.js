const { ErrorHendler, errorMessage } = require("../textMessages");
const { registrationService } = require("../service");
const { userValidators } = require("../validators");

module.exports = {
  isUserValid: (req, res, next) => {
    try {
      const { error } = userValidators.createUserValidator.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isEmailRegistered: async (req, res, next) => {
    try {
      const { email } = req.body;

      const isEmail = await registrationService.findEmail(email);

      if (isEmail) {
        throw new ErrorHendler(
          errorMessage.EMAIL_EXIST.status,
          errorMessage.EMAIL_EXIST.customCode
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
