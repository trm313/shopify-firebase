const express = require("express");
// const functions = require("firebase-functions");
const router = express.Router();

const widgets = require("../helpers/widgets");

router.get("/", (req, res) => {
  // console.log("Environment:", functions.config());
  res.status(200).send("Hello World");
});

router.get("/:collection/:id", async (req, res) => {
  console.log("Widget: ", {
    collection: req.params.collection,
    id: req.params.id,
  });
  const doc = await widgets.getWidgetConfiguration(
    req.params.collection,
    req.params.id
  );
  res.status(200).json(doc);
});

module.exports = router;
