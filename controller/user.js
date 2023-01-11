const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { logger, messageFormat } = require("../logger/index");

const createUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      let errorMessage = error.details[0].message;
      logger.error(messageFormat(req.method, errorMessage, req.originalUrl));
      return res.status(400).send(errorMessage);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      logger.error(
        messageFormat(req.method, "Email Already Exists", req.originalUrl)
      );
      return res.status(400).send("Email Already Exists");
    } else {
      // Insert the new user if they do not exist yet
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      logger.info(messageFormat(req.method, "User Created", req.originalUrl));
      res.status(201).json(user);
    }
  } catch (error) {
    logger.error(messageFormat(req.method, error, req.originalUrl));
    res.status(400).send("Something went wrong");
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    User.findOneAndUpdate(
      { _id: id },
      update,
      { new: true },
      (error, result) => {
        if (error) {
          logger.error(messageFormat(req.method, error, req.originalUrl));
          return res.status(500).send(error);
        }
        logger.info(messageFormat(req.method, "User Updated", req.originalUrl));
        res.status(200).send(result);
      }
    );
  } catch (error) {
    logger.error(messageFormat(req.method, error, req.originalUrl));
    res.status(400).send("Something went wrong");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length) {
      logger.info(messageFormat(req.method, "Users Fetched", req.originalUrl));
      res.status(200).send(users);
    } else {
      logger.info(
        messageFormat(req.method, "Users doesn't exist", req.originalUrl)
      );
      res.status(404).send({ error: "Users doesn't exist" });
    }
  } catch (error) {
    logger.error(messageFormat(req.method, error, req.originalUrl));
    res.status(400).send("Something went wrong");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    User.findOneAndRemove({ _id: id }, (error) => {
      if (error) {
        logger.error(messageFormat(req.method, error, req.originalUrl));
        return res.status(500).send(error);
      }
      logger.info(messageFormat(req.method, "User Deleted", req.originalUrl));
      res.status(200).send({});
    });
  } catch (error) {
    logger.error(messageFormat(req.method, error, req.originalUrl));
    res.status(400).send("Something went wrong");
  }
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
};
