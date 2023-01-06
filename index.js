require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const userRouter = require("./routes/user");
const { logger } = require("./logger/index");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRouter);

//DATABASE CONNECTION
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info("Database Connected Successfully");
    // console.log("Database Connected Successfully");
  })
  .catch((err) => {
    logger.error("Could not connect to the database", err);
    // console.log("Could not connect to the database", err);
  });

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

module.exports = app;
