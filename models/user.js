const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
});

userSchema.plugin(passportLocalMongoose);
//This plugin will automatically add username, hashing, salting and hash passwords in schema with some methods

module.exports = mongoose.model("User", userSchema);
