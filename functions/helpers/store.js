const admin = require("firebase-admin");

/**
 * store {}
 *  type: "shopify",
 *  shop_name: "...",
 *  nonce: "123",
 *  owner: owner_id
 */

exports.installStore = (shopName, nonce) => {
  return admin.firestore().collection("store").doc(shopName).set({
    type: "shopify",
    shopName: shopName,
    nonce: nonce,
  });
};
