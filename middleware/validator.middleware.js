const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
exports.requestValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );
    return next();
  } catch (error) {
    return res.status(500).json({ type: error.name, errors: error.errors });
  }
};

exports.authValidator = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    )
      throw new Error("Unauthorized");
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    if (!payload._id) throw new Error("Unauthorized");
    const existUser = await userService.get(payload._id);
    if (!existUser) throw new Error("Unauthorized");
    req.user = existUser;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

exports.verificationValidator = (req, res, next) => {
  try {
    if (req.user.isVerified) {
      return next();
    }
    return res.status(401).json({ message: "Please verify your email" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
