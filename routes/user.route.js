const router = require("express").Router();
const validate = require("../middleware/validator.middleware").validate;
const userSchemas = require("../validators/user.validator");
const userService = require("../services/user.service");
router.post("/signUp", validate(userSchemas.signUpSchema), async (req, res) => {
  try {
    const createdUser = await userService.signUp(req.body);
    res.send(createdUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/signIn", validate(userSchemas.signInSchema), async (req, res) => {
  try {
    const existUser = await userService.signIn(req.body);
    res.send(existUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get(
  "/verify/:otp",
  validate(userSchemas.verifyEmailSchema),
  async (req, res) => {
    try {
      //TODO: send id from token
      const existUser = await userService.verify(
        "64ee06699d5b3312fb9f1820",
        req.params.otp
      );
      res.send(existUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);
module.exports = router;
