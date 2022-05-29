const User = require("../models/user");

const jwt = require("jsonwebtoken"),
  Joi = require("joi");
function addUser(user) {
  return new Promise(async (resolve, reject) => {
    const newUser = new User(user);
    const { error, value } = newUser.validateUserSchema().validate(user);
    if (error) reject(error);
    else {
      await newUser.hashPassword();
      newUser
        .save()
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    }
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}
const generateToken = (user) => {
  return jwt.sign({ user_id: user._id, isVip: user.isVip }, "myKey", {
    expiresIn: "3m",
  });
};

function getUserById(_id) {
  console.log(_id._id);
  return new Promise((resolve, reject) => {
    User.findById(_id)
      .then((User) => resolve(User))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  generateToken,
};
