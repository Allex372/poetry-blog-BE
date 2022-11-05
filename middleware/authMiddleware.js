const jwt = require('jsonwebtoken');
const { errorMessages, ErrorHendler } = require('../error');
const { config: { JWT_ACCESS, JWT_REFRESH } } = require('../config');
const { constants: { AUTHORIZATION } } = require('../constant');
const { authService } = require('../service');

const { O_Auth } = require('../dataBase/models');
const e = require('express');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                res.status(401).json(401)
                throw new Error('Token is required');
            }

            jwt.verify(access_token, JWT_ACCESS, (err) => {
                if (err) {
                    res.status(401).json(401)
                    throw new Error('Not valid token VERIFY');
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error('Not valid token');
            }

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.body.headers.Authorization;
            // const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHendler(errorMessages.TOKEN_REQUIRED.status, errorMessages.TOKEN_REQUIRED.customCode);
            }

            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    throw new ErrorHendler(errorMessages.NOT_VALID_TOKEN.status, errorMessages.NOT_VALID_TOKEN.customCode);
                }
            });

            const tokens = await authService.findByParams({ refresh_token });

            if (!tokens) {
                throw new ErrorHendler(errorMessages.USER_NOT_FOUND, errorMessages.USER_NOT_FOUND.customCode);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            next(e);
        }
    }
};
