const router = require("express").Router();
const validators = require("../middleware/validator.middleware");
const userSchemas = require("../validators/user.validator");
const userService = require("../services/user.service");

router.post(
  "/signUp",
  validators.requestValidator(userSchemas.signUpSchema),
  async (req, res) => {
    try {
      const createdUser = await userService.signUp(req.body);
      res.send(createdUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

router.post(
  "/signIn",
  validators.requestValidator(userSchemas.signInSchema),
  async (req, res) => {
    try {
      const existUser = await userService.signIn(req.body);
      res.send(existUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

router.get("/resendOtp", async (req, res) => {
  try {
    //TODO: send id from token
    await userService.resendOtp("64ee13b750f361cdcc3bc362");
    res.send({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get(
  "/verify/:otp",
  validators.requestValidator(userSchemas.verifyEmailSchema),
  async (req, res) => {
    try {
      //TODO: send id from token
      await userService.verify("64ee13b750f361cdcc3bc362", req.params.otp);
      res.send({ message: "User verified successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);
module.exports = router;
