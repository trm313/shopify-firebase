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

## Architecture Overview

- React front-end, built via create-react-app
  - Firebase Web - Internal app authentication & CRUD operations
    - Authentication - Firebase auth listener that triggers userReducer actions managed in `client\src\App.js`
  - [Chakra UI](https://chakra-ui.com/docs/features/style-props) - Very flexible UI framework
    - [Style Props](https://chakra-ui.com/docs/features/style-props) - Tailwindcss-like utility inline styling
    - Theming extended from `client\src\Styles\theme.js`
    - Create custom Components like `client\src\Styles\Components\NavLink.js`
  - [React-Router-Dom]() - Defined in `client\src\Routes`
  - [Redux-Toolkit](https://redux-toolkit.js.org/) - Authentication managed through Redux store
    - Reducers: `client\src\Reducers`
    - Initalized: `client\src\index.js`
- Firebase Functions

  - [What can I do with Cloud Functions?](https://firebase.google.com/docs/functions/use-cases?authuser=0)
  - Trigger background functions (eg. `Firebase.auth.user().onCreate((user) => {...})`)
  - Call functions directly from Web

    ```
    // 1. `client\src\index.js` - Initialize Cloud Functions through Firebase
    firebase.initializeApp({ ... });
    var functions = firebase.functions();

    // 2. `client\src\Components\TextComponent` - Load Firebase and call directly
    import Firebase from "firebase/app";
    var addMessage = Firebase.functions().httpsCallable('addMessage');

    addMessage({ text: messageText })
    .then((result) => {
      // Read result of the Cloud Function.
    var sanitizedMessage = result.data.text;
    }).catch (error => {
      const { code, message, details } = error;
    })

    ```

  - Call functions via HTTP requests

    ```
    // https://firebase.google.com/docs/functions/http-events?authuser=0

    ```

  - Host API routes (Currently eg. `/auth/shopify` and `/auth/shopifycallback`)
    - Note: This probably should be done through calling Firebase Functions via HTTP, but shows some flexibility

- Firebase Firestore
  - Document store
