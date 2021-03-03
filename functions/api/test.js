const express = require("express");
const functions = require("firebase-functions");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Environment:", functions.config());
  res.status(200).send("Hello World");
});

module.exports = router;
