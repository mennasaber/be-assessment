const router = require("express").Router();
const validators = require("../middleware/validator.middleware");
const checkValidators = require("../validators/check.validator");
const checkService = require("../services/check.service");
const reportService = require("../services/report.service");
router.post(
  "/",
  validators.authValidator,
  validators.requestValidator(checkValidators.createCheckValidator),
  async (req, res) => {
    try {
      const createdCheck = await checkService.create(req.body, req.user);
      reportService.subscribe(createdCheck);
      res.send({ message: "Check created successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  validators.authValidator,
  validators.requestValidator(checkValidators.updateCheckValidator),
  async (req, res) => {
    try {
      const updatedCheck = await checkService.update(
        req.params.id,
        req.body,
        req.user
      );
      reportService.unsubscribe(req.params.id);
      reportService.subscribe(updatedCheck);
      res.send({ message: "Check updated successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  validators.authValidator,
  validators.requestValidator(checkValidators.removeCheckValidator),
  async (req, res) => {
    try {
      await checkService.remove(req.params.id, req.user);
      reportService.unsubscribe(req.params.id);
      res.send({ message: "Check removed successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

router.get(
  "/:id",
  validators.authValidator,
  validators.requestValidator(checkValidators.getCheckValidator),
  async (req, res) => {
    try {
      const check = await checkService.getById(req.params.id, req.user);
      res.send(check);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

router.get("/", validators.authValidator, async (req, res) => {
  try {
    const checks = await checkService.get(req.user);
    res.send(checks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
module.exports = router;
