const express = require("express");
const axios = require("axios");
const ShopifyToken = require("shopify-token");
const router = express.Router();
const config = require("../config");
// const generateNonce = require("../helpers").generateNonce;
const installStore = require("../helpers/store").installStore;

router.get("/", (req, res) => {
  res.status(200).send("api/auth > Hello World");
});

router.get("/shopify", (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(401).send("Must provide a valid Shopify domain");
  // 0. Initialize ShopifyToken

  const shopifyToken = new ShopifyToken({
    redirectUri: config.SHOPIFY_REDIRECT_URL,
    sharedSecret: config.SHOPIFY_API_SECRET_KEY,
    apiKey: config.SHOPIFY_API_KEY,
    shop: req.query.shop,
  });

  // 1. Generate nonce
  const nonce = shopifyToken.generateNonce();

  // 2. Generate authorization URL
  const uri = shopifyToken.generateAuthUrl(shop, "read_products", nonce);

  // 3. Save the nonce somewhere to verify it later
  req.session.state = nonce;
  installStore(shop, nonce).then(() => {
    res.redirect(uri);
  });
});

router.get("/shopify/callback", (req, res) => {
  const { code, shop, state } = req.query;
  const shopifyToken = new ShopifyToken({
    redirectUri: config.SHOPIFY_REDIRECT_URL,
    sharedSecret: config.SHOPIFY_API_SECRET_KEY,
    apiKey: config.SHOPIFY_API_KEY,
    shop: req.query.shop,
  });

  if (
    typeof state !== "string" ||
    state !== req.session.state || // Validate that the state (nonce) is the same
    !shopifyToken.verifyHmac(req.query) // Validate the Hmac calculates properly
  ) {
    return res.status(400).send("Shopify integration security checks failed");
  }

  // Exchange the authorization code for a permanent access token.
  shopifyToken
    .getAccessToken(shop, code)
    .then((data) => {
      const token = data.access_token;
      console.log("token", token);

      req.session.token = token;
      req.session.state = undefined;
      console.log("SUCCESSFULLY INTEGRATED TO SHOPIFY");
      res.redirect("http://localhost:3000");
    })
    .catch((err) => {
      console.error(err.stack);
      res.status(500).send("Something went wrong integrating to Shopify");
    });
});

module.exports = router;
