"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.NODE_PORT || "3000";
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get("/ping", function (req, res) {
  res.send({ message: "ping", datetime: new Date().toISOString() });
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// start
app.listen(port, function () {
  console.log(`App listening on port:${port}`);
});
