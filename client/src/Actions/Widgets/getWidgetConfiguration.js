import Firebase from "firebase/app";
import ReactGA from "react-ga";

const getWidgetConfiguration = ({ id, collection }) => {
  ReactGA.event({
    category: "Widget",
    action: "Load widget",
  });

  console.log("getWidgetConfiguration>", { id, collection });
  return Firebase.firestore()
    .collection(collection.toLowerCase())
    .doc(id)
    .get()
    .then((doc) => {
      console.log(doc, doc.id, doc.data());
    })
    .catch((error) => {
      console.error("Error getting document: ", error);
    });
};

export default getWidgetConfiguration;
