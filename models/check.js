const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const authenticationSchema = mongoose.Schema({
  username: String,
  password: String,
});
const headerSchema = mongoose.Schema({
  key: String,
  value: String,
});
const assertSchema = mongoose.Schema({
  statusCode: Number,
});
const checkSchema = mongoose.Schema(
  {
    name: String,
    url: String,
    protocol: {
      type: String,
      enum: ["HTTP", "HTTPS", "TCP"],
    },
    path: {
      type: string,
      required: false,
    },
    port: {
      type: string,
      required: false,
    },
    webhook: {
      type: string,
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
