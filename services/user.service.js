const User = require("../models/user");
const UserResponseDto = require("../dto/userRespose.dto").UserResponseDto;
exports.signUp = async (dto) => {
  const existUser = await User.findOne({
    email: dto.email.toLowerCase(),
  });
  if (existUser) throw new Error("User already exists");
  dto.email = dto.email.toLowerCase();
  //TODO: generate random otp
  //TODO: encrypt password
  //TODO: send verification mail
  //TODO: generate token
  const createdUser = await User.create(dto);
  return new UserResponseDto({
    ...createdUser.toObject(),
    token: "Temp Token",
  });
};

exports.signIn = async (dto) => {
  const existUser = await User.findOne({
    email: dto.email.toLowerCase(),
  });
  if (!existUser) throw new Error("User not found");
  //TODO: validate password
  //TODO: generate token
  return new UserResponseDto({ ...existUser.toObject(), token: "Temp Token" });
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
  await existUser.save();
  //TODO: generate token
  return new UserResponseDto({ ...existUser.toObject(), token: "Temp Token" });
};
