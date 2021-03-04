const express = require("express");
const session = require("express-session");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(
  session({
    secret: "eo3Athuo4Ang5gai",
    saveUninitialized: false,
    resave: false,
  })
);

const apiRoutes = require("./api");
app.use("/api", apiRoutes);

/* Functions */
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

/* HTTPS Server */
exports.app = functions.https.onRequest(app);
