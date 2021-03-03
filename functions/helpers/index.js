const ShopifyAPI = require("shopify-api-node");
const config = require("../config");
const crypto = require("crypto");

module.exports = {
  openSession(shop) {
    //...
  },

  generateNonce(bits = 64) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    for (let i = 0; i < bits; i++) {
      text += possible.charAt(Math.floor(Math.random() * bits));
    }
    return text;
  },

  verifyHmac(data, hmac) {
    if (!hmac) {
      return false;
    } else if (!data || typeof data !== "object") {
      return false;
    }

    const sharedSecret = config.SHOPIFY_SHARED_SECRET;
    const calculatedSignature = crypto
      .createHmac("sha256", sharedSecret)
      .update(Buffer.from(data), "utf8")
      .digest("base64");

    return calculatedSignature;
  },

  verifyOAuth(query) {
    if (!query.hmac) {
      return false;
    }
    const hmac = query.hmac;
    const sharedSecret = config.SHOPIFY_SHARED_SECRET;
    delete query.hmac;
    const sortedQuery = Object.keys(query)
      .map((key) => `${key}=${Array(query[key]).join(",")}`)
      .sort()
      .join("&");
    const calculatedSignature = crypto
      .createHmac("sha256", sharedSecret)
      .update(sortedQuery)
      .digest("hex");
    if (calculatedSignature === hmac) {
      return true;
    }

    return false;
  },
};
