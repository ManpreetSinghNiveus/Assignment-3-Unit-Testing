const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("Email Already Exists!");
    } else {
      // Insert the new user if they do not exist yet
      user = new Use({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      console.log("user :>> ", user);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      res.status(200).json({
        data: user,
      });
    }
  } catch (error) {
    res.status(404);
    res.send({ error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length) {
      res.send(users);
    } else {
      res.status(404);
      res.send({ error: "Users doesn't exist!" });
    }
  } catch (error) {
    res.status(400);
    res.send({ error: error });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
};
