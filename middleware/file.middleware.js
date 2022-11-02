const {errorMessages, ErrorHendler} = require('../error');
const {constants} = require('../constant');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            const photos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];

                if (constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (constants.PHOTO_MAX_SIZE < size) {
                        throw new Error(`${name} too big`);
                    }
                    photos.push(allFiles[i]);
                } else {
                    throw new ErrorHendler(errorMessages.NOT_VALID_FILE);
                }
            }

            // eslint-disable-next-line prefer-destructuring
            req.photos = photos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatarLength: (req, res, next) => {
        try {
            const [avatar] = req.photos;

            if (req.photos.length > 1) {
                throw new ErrorHendler(errorMessages.TOO_MATCH_PHOTOS);
            }

            req.avatar = avatar;

            next();
        } catch (e) {
            next(e);
        }
    },
};
