import Firebase from "firebase/app";
import ReactGA from "react-ga";
import { prepareDocForCreate } from "../Helpers/firestoreHelpers";

// Check if integration exists
// If exists -> proceed
// If not exists -> create

const checkForIntegration = async (shop, token) => {
  let uid = Firebase.auth().currentUser.uid;
  const integration = await Firebase.firestore()
    .collection("integrations")
    .where("ownerUid", "==", uid)
    .where("type", "==", "shopify")
    .where("shop", "==", shop)
    .where("token", "==", token)
    .get();

  if (integration.empty) {
    return false;
  } else {
    return true;
  }

  // integration.forEach((doc) => {
  //   let id = doc.id;
  //   let data = doc.data();
  //   console.log({id, data})
  // });
};

const createIntegration = (shop, token) => {
  ReactGA.event({
    category: "Integration",
    action: "Link Shopify",
  });
  return Firebase.firestore()
    .collection("integrations")
    .add(
      prepareDocForCreate({
        type: "shopify",
        shop,
        token,
        ownerUid: Firebase.auth().currentUser.uid,
      })
    )
    .then(() => console.log("Created Shopify Integration"))
    .catch((error) => {
      console.log(`Failed to link Shopify store: ${error.message}`);
    });
};

const integrateShopify = async (shop, token, cbSuccess, cbError) => {
  try {
    let integration = await checkForIntegration(shop, token);

    if (integration) {
      console.log("Integration exists");
      return cbSuccess("Verified Shopify integration");
    }

    console.log("Creating integration");
    createIntegration(shop, token);
    return cbSuccess("Successfully linked Shopify store");
  } catch (error) {
    console.log("Integration to Shopify failed:", error, error.message);
    cbError("Integration failed");
  }
};

export default integrateShopify;
