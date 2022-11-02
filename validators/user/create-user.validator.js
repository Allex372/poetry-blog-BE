const Joi = require('joi');

const { regex } = require('../../constant');

module.exports = Joi.object({
    email: Joi.string().regex(regex.EMAIL_REGEXP).required(),
    role: Joi.string(),
    password: Joi.string().required(),
});
