const User = require("../models/user");
const bcrypt = require("bcryptjs");
const UserResponseDto = require("../dto/userRespose.dto").UserResponseDto;
const jwt = require("jsonwebtoken");
exports.signUp = async (dto) => {
  const existUser = await User.findOne({
    email: dto.email.toLowerCase(),
  });
  if (existUser) throw new Error("User already exists");
  dto.email = dto.email.toLowerCase();
  dto.otp = Math.floor(1000 + Math.random() * 9000).toString();
  dto.password = await bcrypt.hash(dto.password, 10);
  //TODO: send verification mail
  const createdUser = await User.create(dto);
  return new UserResponseDto({
    ...createdUser.toObject(),
    token: jwtSign(createdUser),
  });
};

exports.signIn = async (dto) => {
  const existUser = await User.findOne({
    email: dto.email.toLowerCase(),
  });
  if (!existUser || !(await bcrypt.compare(dto.password, existUser.password)))
    throw new Error("User not found");
  //TODO: generate token
  return new UserResponseDto({
    ...existUser.toObject(),
    token: jwtSign(existUser),
  });
};

exports.get = async (id) => {
  return await User.findById(id);
};

exports.verify = async (id, otp) => {
  const existUser = await User.findById(id);
  if (!existUser) throw new Error("User not found");
  if (existUser.isVerified) throw new Error("User already verified");
  if (existUser.otp !== otp) throw new Error("Invalid Otp");
  existUser.isVerified = true;
  existUser.otp = null;
  await existUser.save();
};

exports.resendOtp = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) throw new Error("User not found");
  if (existUser.isVerified) throw new Error("User already verified");
  existUser.otp = Math.floor(1000 + Math.random() * 9000).toString();
  await existUser.save();
  //TODO: send verification mail
};

function jwtSign(user) {
  return jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "2h",
  });
}
