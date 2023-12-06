const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
const mainRouter = require("./router/mainRouter");
require("dotenv").config();
const mongoose = require("mongoose");
const dbUrl = process.env.connectString;
mongoose.connect(dbUrl);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Mongo db Connected");
});

db.on("error", () => {
  console.log("error");
});

app.use(bodyParser.json());
app.use(mainRouter);

app.listen(port, () => {
  console.log("port is listening");
});
