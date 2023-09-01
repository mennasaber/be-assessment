const monitorService = require("../services/monitor.service");
const router = require("express").Router();
const validators = require("../middleware/validator.middleware");

router.get(
  "/",
  validators.authValidator,
  validators.verificationValidator,
  async (req, res) => {
    try {
      const reports = await monitorService.getChecksReport(
        req.user,
        req.query.tag
      );
      res.send(reports);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);
module.exports = router;
