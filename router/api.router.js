const router = require('express').Router();

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const postsRouter = require('./posts.router');
const registrationRouter = require('./registration.router');
const accountRouter = require('./account.router');
const commentsRouter = require('./comments.router');

router.use('/registration', registrationRouter);

router.use('/login', authRouter);

router.use('/users', userRouter);

router.use('/account', accountRouter);

router.use('/posts', postsRouter);

router.use('/comments', commentsRouter);

module.exports = router;
