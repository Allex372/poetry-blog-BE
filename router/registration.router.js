const router = require('express').Router();

const { registrationController } = require('../controller');
const { registrationMiddleware } = require('../middleware');

router.post('/',
    registrationMiddleware.isUserValid,
    registrationMiddleware.isEmailRegistered,
    registrationController.createUser);

module.exports = router;
