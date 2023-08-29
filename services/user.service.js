const User = require("../models/user");
const bcrypt = require("bcryptjs");
const UserResponseDto = require("../dto/userRespose.dto").UserResponseDto;
const jwt = require("jsonwebtoken");
const mailerService = require("../services/mailer.service");
exports.signUp = async (dto) => {
  const existUser = await User.findOne({
    email: dto.email.toLowerCase(),
  });
  if (existUser) throw new Error("User already exists");
  dto.email = dto.email.toLowerCase();
  dto.otp = Math.floor(1000 + Math.random() * 9000).toString();
  dto.password = await bcrypt.hash(dto.password, 10);
  const createdUser = await User.create(dto);
  await mailerService.sendMail(
    dto.email,
    "Verify Your Email",
    `Your OTP for be-assessment is ${dto.otp}`
  );
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
  return new UserResponseDto({
    ...existUser.toObject(),
    token: jwtSign(existUser),
  });
};

exports.get = async (id) => {
  return await User.findById(id);
};

exports.verify = async (user, otp) => {
  if (user.isVerified) throw new Error("User already verified");
  if (user.otp !== otp) throw new Error("Invalid Otp");
  user.isVerified = true;
  user.otp = null;
  await user.save();
};

exports.resendOtp = async (user) => {
  if (user.isVerified) throw new Error("User already verified");
  user.otp = Math.floor(1000 + Math.random() * 9000).toString();
  await user.save();
  await mailerService.sendMail(
    user.email,
    "Verify Your Email",
    `Your OTP for be-assessment is ${user.otp}`
  );
};

function jwtSign(user) {
  return jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "2h",
  });
}
