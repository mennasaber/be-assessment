const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const monitorSchema = new mongoose.Schema(
  {
    check: {
      type: ObjectId,
      ref: "check",
      index: true,
    },
    status: {
      type: String,
      enum: ["UP", "DOWN"],
      index: true,
    },
    interval: Number,
    responseTime: Number,
    //TODO: response time
  },
  { timestamps: true, autoIndex: true }
);
module.exports = mongoose.model("monitor", monitorSchema);
