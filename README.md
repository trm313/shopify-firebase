# Setup

## Installation

** Repo setup **

1. Clone repository
1. Run `npm install` in the root, `client`, `scripts`, and `functions` directories

** Shopify setup **

1. ...

** Firebase setup **

1. Create your Firebase project. Resources we will be using:

- Authentication (Google provider)
- Cloud Firestore
- Hosting
- Functions (will require upgrade to Blaze pay-as-you-go plan - it has good free quotas and billing alerts, so no surprises)

1. Copy/rename `functions\.runtimeconfig.example.json` to `functions\.runtimeconfig.json` and populate with environment variables for your local development environment
1. Copy/rename `client\.env.example` to `client\.env` and populate with environment variables to be leveraged by the React client (TODO: Figure out how to deploy these to Firebase hosting)

## Development Environment

## Production Environment

1. Set environment variables for Firebase functions using `functions ... :set ...`
   ...

# Deploying Application

## Deploy Frontend

Files must build to a deployment directory (default is "public", changed to "client/build")
Deploy files to hosting via `firebase deploy --only hosting:shopify-firebase-boilerplate`

## Environment variables

Environment variables for consumption by Firebase Functions:

`firebase functions:config:get`

`firebase functions:config:set private.env="dev" stripe.key="[stripe_key]" stripe.secret="[stripe_secret]"`

`firebase functions:config:set private.key="YOUR API KEY" project.id="YOUR CLIENT ID" client.email="YOUR CLIENT EMAIL"`

# How It Works

## Tech Stack Overview

- React front-end, built via create-react-app
  - Firebase Web for internal app authentication & CRUD operations
- Firebase Functions

  - Useful triggers (eg. `...auth.user().onCreate((user) => {...})`)
  - Call functions directly from Web - Initalize Cloud Functions into app

    ```
    firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FUNCTIONS PROJECT ID ###'
    databaseURL: 'https://### YOUR DATABASE NAME ###.firebaseio.com',
    });

        // Initialize Cloud Functions through Firebase
        var functions = firebase.functions();

        // ...
        var addMessage = firebase.functions().httpsCallable('addMessage');

    addMessage({ text: messageText })
    .then((result) => {
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data.text;
    }).catch (error => {
      const { code, message, details } = error;
    })

    ```

  - Call functions via HTTP requests
  - Host API routes (eg. `/auth/shopify` and `/auth/shopifycallback`)
    - Could also be done through calling Firebase Functions via HTTP

- Firebase Firestore
  - Document store
