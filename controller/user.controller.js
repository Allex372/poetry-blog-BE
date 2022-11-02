const fs = require('fs-extra').promises;
const { userService, emailService } = require('../service');
const { errorCodes, emailActions } = require('../constant');
const { passwordsHasher, filePathBuider } = require('../helper');
const { errorMessages } = require('../error');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await userService.findAllUsers();

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const userId = req.params.id;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res, next) => {
        console.log(req.body)
        try {
            const {
                body: { password, email, name }, avatar, docs, videos
            } = req;
            const hashPassword = await passwordsHasher.hash(password);

            const createdUser = await userService.createUser({ ...req.body, password: hashPassword });

            if (avatar) {
                // eslint-disable-next-line max-len
                const { finalFilePath, uploadPath, fileDir } = filePathBuider.fileBuilderPath(avatar.name, 'photos', createdUser._id);

                await fs.mkdir(fileDir, { recursive: true });

                await avatar.mv(finalFilePath);

                await userService.updateUser(createdUser._id, { avatar: uploadPath });
            }

            if (docs) {
                // eslint-disable-next-line max-len
                const { finalFilePath, uploadPath, fileDir } = filePathBuider.fileBuilderPath(docs.name, 'documents', createdUser._id);

                await fs.mkdir(fileDir, { recursive: true });

                await docs.mv(finalFilePath);

                await userService.updateUser(createdUser._id, { docs: uploadPath });
            }

            if (videos) {
                // eslint-disable-next-line max-len
                const { finalFilePath, uploadPath, fileDir } = filePathBuider.fileBuilderPath(videos.name, 'videos', createdUser._id);

                await fs.mkdir(fileDir, { recursive: true });

                await videos.mv(finalFilePath);

                await userService.updateUser(createdUser._id, { videos: uploadPath });
            }

            await emailService.sendMail(email, emailActions.WELCOME, { userName: name });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    },

    deleteSingleUser: async (req, res) => {
        try {
            const userId = req.params.id;
            //
            // const user = await userService.findUserById(userId);
            //
            // const { email, name } = user;

            // await userService.deleteSingleUser(userId);
            //
            // await emailService.sendMail(email, emailActions.USER_DELETED, { userName: name });

            res.json(`${name} was deleted`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
