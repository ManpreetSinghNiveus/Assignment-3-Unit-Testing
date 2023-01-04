var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

var user = new mongoose.model("User", schema);

module.exports = user;
