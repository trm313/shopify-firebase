import Firebase from "firebase/app";
// import ReactGA from "react-ga";

const removeIntegration = (id) => {
  Firebase.firestore()
    .collection("integrations")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export default removeIntegration;
