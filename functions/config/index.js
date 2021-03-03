const functions = require("firebase-functions");
const production = require("./production");
const development = require("./development");

// Load environment variables from Firebase
// Set environment variables using scripts in functions/package.json
let env = functions.config();

const config = {
  SHOPIFY_API_KEY: env.shopify.api_key,
  SHOPIFY_API_SECRET_KEY: env.shopify.api_secret_key,
  SHOPIFY_REDIRECT_URL: env.shopify.redirect_url,
  APP_NAME: "AppName",
  APP_STORE_NAME: "AppStoreName",
  APP_SCOPE: "read_products,read_customers",
  DATABASE_NAME: "DatabaseName",
};

if (env !== "PRODUCTION") {
  module.exports = Object.assign({}, config, development);
} else {
  module.exports = Object.assign({}, config, production);
}
