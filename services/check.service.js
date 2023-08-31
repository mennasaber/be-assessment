const CheckModel = require("../models/check");
exports.create = async (dto, user) => {
  return await CheckModel.create({ ...dto, user: user._id });
};

exports.update = async (id, dto, user) => {
  const existCheck = await CheckModel.findById(id);
  if (!existCheck) throw new Error("Check not found");
  if (existCheck.user.toString() !== user._id.toString())
    throw new Error("Not allowed");
  return await CheckModel.findByIdAndUpdate(id, dto, { new: true });
};

exports.getById = async (id, user) => {
  const existCheck = await CheckModel.findById(id);
  if (!existCheck) throw new Error("Check not found");
  if (existCheck.user.toString() !== user._id.toString())
    throw new Error("Not allowed");
  return existCheck;
};

exports.get = async (user) => {
  const userChecks = await CheckModel.find({ user: user._id });
  return userChecks;
};

exports.remove = async (id, user) => {
  const existCheck = await CheckModel.findById(id);
  if (!existCheck) throw new Error("Check not found");
  if (existCheck.user.toString() !== user._id.toString())
    throw new Error("Not allowed");
  await CheckModel.findByIdAndRemove(id);
};

exports.getAll = async () => {
  return await CheckModel.find();
};
