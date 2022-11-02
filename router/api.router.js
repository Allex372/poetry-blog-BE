const router = require('express').Router();

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const postsRouter = require('./posts.router');
const registrationRouter = require('./registration.router');

router.use('/registration', registrationRouter);

router.use('/login', authRouter);

router.use('/users', userRouter);

router.use('/posts', postsRouter);

module.exports = router;
