const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

module.exports = router;
