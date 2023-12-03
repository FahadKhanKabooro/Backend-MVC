const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
const mainRouter = require("./router/mainRouter");

app.use(bodyParser.json());
app.use(mainRouter);

app.listen(port, () => {
  console.log("port is listening");
});
