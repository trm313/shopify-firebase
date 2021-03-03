const express = require("express");
// const Shopify = require("shopify-api-node");
const router = express.Router();
const config = require("../config");
const generateNonce = require("../helpers").generateNonce;

router.get("/", (req, res) => {
  res.status(200).send("api/auth > Hello World");
});

router.get("/shopify", (req, res) => {
  console.log("/shopify", req.query);
  const shopName = req.query.shop;
  const nonce = generateNonce();

  if (!shopName)
    return res.status(401).send("Must provide a valid Shopify shop");

  // Is there an existing store in Firestore?
  // ...

  // Per the docs, I'm supposed to redirect them to:
  // https://{shop}.myshopify.com/admin/oauth/authorize?client_id={api_key}&scope={scopes}&redirect_uri={redirect_uri}&state={nonce}&grant_options[]={access_mode}

  const shopifyConfig = {
    apiKey: config.SHOPIFY_API_KEY,
    secret: config.SHOPIFY_API_SECRET_KEY,
    scopes: ["read_products"],
    redirectUri: `${config.SHOPIFY_REDIRECT_URL}/auth/shopify/callback`,
    accessMode: "offline", // NOTE - I think I may want "per-user" (online) mode? since I'm not really doing any background work. That would be something to maintain in session storage or something, whereas offline access is a permanent token
    nonce,
  };

  let redirectUrl = `https://${shopName}/admin/oauth/authorize?client_id=${shopifyConfig.apiKey}&scope=${shopifyConfig.scopes}&redirect_uri=${shopifyConfig.redirectUri}&state=${shopifyConfig.nonce}&grant_options[]=${shopifyConfig.accessMode}`;
  res.redirect(redirectUrl);
});

router.get("/shopify/callback", (req, res) => {
  console.log("/shopify/callback", req.query);
  res.status(200).send({ route: "GET /shopify/callback", quer: req.query });
});

module.exports = router;
