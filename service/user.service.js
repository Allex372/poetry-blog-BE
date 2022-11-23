const User = require("../dataBase/models/User");

module.exports = {
  findAllUsers: () => User.find(),

  findUserById: (userId) => User.findById(userId),

  createUser: (userObject) => User.create(userObject),

  updateUser: (userId, updateObject) =>
    User.updateOne({ _id: userId }, { $set: updateObject }),
};
