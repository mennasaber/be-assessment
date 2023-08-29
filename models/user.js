const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: String,
  password: String,
  otp: String,
  isVerified: { type: Boolean, default: false },
});
module.exports = mongoose.model("user", userSchema);
