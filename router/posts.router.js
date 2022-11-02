const router = require('express').Router();
const { postsController } = require('../controller');
const { userMiddleware, authMiddleware: { checkAccessTokenMiddleware }, checkRoleMiddleware, fileMiddleware } = require('../middleware');

router.get('/', checkAccessTokenMiddleware, postsController.getAllPosts);

router.post('/',
    // checkAccessTokenMiddleware,
    fileMiddleware.checkFile,
    postsController.createPost)

// router.get('/:id', userController.getSingleUser);
//
// router.delete('/:id', userController.deleteSingleUser);
//
// router.post('/product')
//
// router.post('/',
//     // fileMiddleware.checkFile,
//     // fileMiddleware.checkAvatarLength,
//     // fileMiddleware.checkDocumentLength,
//     // fileMiddleware.checkVideoLength,
//     userMiddleware.isLoginExisted,
//     userMiddleware.isEmailCreated,
//     userMiddleware.isUserValid,
//     userController.createUser);

module.exports = router;
