const yup = require("yup");

exports.signUpSchema = yup.object({
  body: yup.object({
    firstName: yup.string().min(1).required().strict(),
    lastName: yup.string().min(1).required().strict(),
    email: yup.string().email().required().strict(),
    password: yup.string().min(8).max(20).required().strict(),
  }),
});

exports.signInSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required().strict(),
    password: yup.string().min(8).max(20).required().strict(),
  }),
});

exports.verifyEmailSchema = yup.object({
  params: yup.object({ otp: yup.string().required().strict() }),
});
