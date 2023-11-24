const express = require("express");
const bodyParser = require("body-parser");
const routes = require("express").Router();
const tasksList = require("../src/routes/tasksList");

const app = express();

app.use(routes);
app.use(bodyParser.json());

const port = 3000;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Task Manager API");
});

routes.use("/tasks", tasksList);

app.listen(port, (err) => {
  if (!err) {
    console.log("Server is running.");
  } else {
    console.log("Server is not running due to an error.");
  }
});
