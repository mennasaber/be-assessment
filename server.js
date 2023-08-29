const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");
require("dotenv").config();
require("./config/database").connect();
app.use(express.json());
app.use("/user", userRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server start listening to port ${process.env.PORT}`);
});
