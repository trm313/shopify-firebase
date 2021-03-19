import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import ReactGA from "react-ga";

import rootReducer from "./Reducers";

// Firebase Web App Config
// NOTE: None of these are sensitive, these are intended for client-side consumption
const dbConfig = {
  apiKey: "AIzaSyBmL0qM20olj3JTh0OnLjGwTmTKrcOxy5A",
  authDomain: "shopifyappfirefly.firebaseapp.com",
  projectId: "shopifyappfirefly",
};
Firebase.initializeApp(dbConfig);

Firebase.auth()
  .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });

// Google Analytics
// https://github.com/react-ga/react-ga#api
// ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID)

// Sentry
// https://docs.sentry.io/clients/javascript/integrations/react/
// window.Raven.config(process.env.REACT_APP_SENTRY_RAVEN_TRACKING_URL).install()

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
