const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});
exports.sendMail = (to, subject, text) => {
  transporter
    .sendMail({ from: process.env.MAIL, to, subject, text })
    .catch((error) => {
      throw new Error(error.message);
    });
};
