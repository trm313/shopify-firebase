import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";

console.log("create-react-app env:", process.env.NODE_ENV);
console.log("firefly project:", process.env.REACT_APP_ENV);
console.log(process.env);

// Firebase
const dbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
Firebase.initializeApp(dbConfig);
var db = Firebase.firestore();

const testFetchFromFirestore = (collection = "posts") => {
  try {
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log({ doc_id: doc.id, doc_data: doc.data() });
        });
      });
  } catch (err) {
    console.log("Failed:testFetchFromFirestore", err);
  }
};
testFetchFromFirestore();

// Google Analytics
// https://github.com/react-ga/react-ga#api
// ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)

// Sentry
// https://docs.sentry.io/clients/javascript/integrations/react/
// window.Raven.config(process.env.REACT_APP_SENTRY_RAVEN_TRACKING_URL).install()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
