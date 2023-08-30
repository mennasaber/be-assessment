const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const authenticationSchema = mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { _id: false }
);
const headerSchema = mongoose.Schema(
  {
    key: String,
    value: String,
  },
  { _id: false }
);
const assertSchema = mongoose.Schema(
  {
    statusCode: Number,
  },
  { _id: false }
);
const checkSchema = mongoose.Schema(
  {
    name: String,
    url: String,
    protocol: {
      type: String,
      enum: ["HTTP", "HTTPS", "TCP"],
    },
    path: {
      type: String,
      required: false,
    },
    port: {
      type: String,
      required: false,
    },
    webhook: {
      type: String,
      required: false,
    },
    timeout: {
      type: Number,
      default: 5,
    },
    interval: {
      type: Number,
      default: 10,
    },
    threshold: {
      type: Number,
      default: 1,
    },
    authentication: {
      type: authenticationSchema,
      required: false,
    },
    httpHeaders: {
      type: [headerSchema],
      required: false,
    },
    assert: {
      type: assertSchema,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    ignoreSSL: {
      type: Boolean,
    },
    user: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, autoIndex: true }
);
module.exports = new mongoose.model("check", checkSchema);
