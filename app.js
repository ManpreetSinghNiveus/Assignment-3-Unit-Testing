require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const userRouter = require("./routes/user");
const { logger } = require("./logger/index");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRouter);

app.post("/hello", (req, res) => {
  res.sendStatus(200);
});

//DATABASE CONNECTION
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info("Database Connected Successfully");
  })
  .catch((err) => {
    logger.error("Could not connect to the database", err);
  });

module.exports = app;
