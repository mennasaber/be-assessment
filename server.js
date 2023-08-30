const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/user.route");
const checkRouter = require("./routes/check.route");
require("./config/database").connect();
app.use(express.json());
app.use("/user", userRouter);
app.use("/check", checkRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server start listening to port ${process.env.PORT}`);
});
