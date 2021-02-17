const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },

  username: {
    require: true,
    type: String,
  },

  token: String,
  hash: String,
  salt: String,
});

module.export = User;
