const express = require("express");
const router = express.Router();
// const config = require("../config");
// const generateNonce = require("../helpers").generateNonce;

router.get("/", (req, res) => {
  res.status(200).send("api/auth > Hello World");
});

router.get("/shopify", (req, res) => {
  // const shopName = req.query.shop;
  // const nonce = generateNonce();
  console.log("/shopify", req.query);
});

router.get("/shopify/callback", (req, res) => {});

module.exports = router;
