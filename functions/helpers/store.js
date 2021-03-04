const admin = require("firebase-admin");

/**
 * store {}
 *  type: "shopify",
 *  shop_name: "...",
 *  nonce: "123",
 *  owner: owner_id
 */

exports.installStore = async (shop, accessToken) => {
  const doc = await admin.firestore().collection("store");
  return admin.firestore().collection("store").add({
    type: "shopify",
    shop,
    accessToken,
  });
};
