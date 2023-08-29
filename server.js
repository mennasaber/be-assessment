const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database").connect();
app.listen(process.env.PORT, () => {
  console.log(`Server start listening to port ${process.env.PORT}`);
});
