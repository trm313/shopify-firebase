const functions = require("firebase-functions");
const express = require("express");

const app = express();

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
