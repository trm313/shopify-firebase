const express = require("express");
// const Firebase = require("firebase/app");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  // console.log("Environment:", functions.config());
  res.status(200).send("Hello World");
});

router.get("/boot", (req, res) => {
  const { widgetId } = req.query;
  console.log("/boot", widgetId);

  // res.status(200).send(`/**/_myappPlatformBoot123(test)`);
  res.status(200).json({
    widgetId,
  });
});

router.get("/widget/:file", (req, res) => {
  // console.log("Widget: ", req.params.id);
  // res.status(200).send(`<p>Testing</p>`);
  res.sendFile(path.join(__dirname + `/widgets/${req.params.file}`));
});

router.get("/:file", (req, res) => {
  // console.log("Widget: ", req.params.id);
  // res.status(200).send(`<p>Testing</p>`);
  res.sendFile(path.join(__dirname + `/${req.params.file}`));
});

module.exports = router;
