const { User } = require('../dataBase/models');

module.exports = {
    createUser: (userObj) => {
        User.create(userObj)
    },
    findEmail: (email) => User.findOne({ email }),
};
