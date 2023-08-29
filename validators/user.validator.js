const yup = require("yup");

exports.signUpSchema = yup.object({
  body: yup.object({
    firstName: yup.string().min(1).required(),
    lastName: yup.string().min(1).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
  }),
});

exports.signInSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
  }),
});

exports.verifyEmailSchema = yup.object({
  params: yup.object({ otp: yup.string().required() }),
});
