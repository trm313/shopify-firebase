const env = process.env.NODE_ENV;
const production = require("./production");
const development = require("./development");

const config = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY || "",
  SHOPIFY_SHARED_SECRET: process.env.SHOPIFY_SHARED_SECRET || "",
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
