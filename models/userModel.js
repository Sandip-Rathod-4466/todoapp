const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select:false,
    },
  },
  { timestamps: true}
);

module.exports = mongoose.model("user",userSchema);