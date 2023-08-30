const router = require("express").Router();
const validators = require("../middleware/validator.middleware");
const checkValidators = require("../validators/check.validator");
router.post(
  "/",
  validators.authValidator,
  validators.requestValidator(checkValidators.createCheckValidator),
  (req, res) => {
    res.send("great!!!!");
  }
);
router.put(
  "/:id",
  validators.authValidator,
  validators.requestValidator(checkValidators.updateCheckValidator),
  (req, res) => {
    res.send("great!!!!");
  }
);
module.exports = router;
