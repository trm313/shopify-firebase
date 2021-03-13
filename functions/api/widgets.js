const express = require("express");
const functions = require("firebase-functions");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  console.log("Environment:", functions.config());
  res.status(200).send("Hello World");
});

router.get("/:id", (req, res) => {
  console.log("Widget: ", req.params.id);
  // res.status(200).send(`<p>Testing</p>`);
  res.sendFile(path.join(__dirname + "../scripts/testingWidget.js"));
});

module.exports = router;
