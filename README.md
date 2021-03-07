# Setup

## Installation

**Repo setup**

1. Clone repository
1. Run `npm install` in the root, `client`, `scripts`, and `functions` directories

**Shopify setup**

1. ...

**Firebase setup**

1. Create your Firebase project. Resources we will be using:

- Authentication (Google provider)
- Cloud Firestore
- Hosting
- Functions (will require upgrade to Blaze pay-as-you-go plan - it has good free quotas and billing alerts, so no surprises)

1. Copy/rename `functions\.runtimeconfig.example.json` to `functions\.runtimeconfig.json` and populate with environment variables for your local development environment
1. Copy/rename `client\.env.example` to `client\.env` and populate with environment variables to be leveraged by the React client (TODO: Figure out how to deploy these to Firebase hosting)

## Development Environment

1. TODO

1. TODO

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
- Integrations
  - Shopify - This boilerplate can serve as a grab-and-go Shopify Public App

# Integrations

## Shopify

Shopify has a very nice app ecosystem. A Shopify app is simply a website that follows certain authentication protocols, so it's very flexible about any technologies you want to use. They have some great resources and walkthroughs as well.

There are two types of Shopify apps:

- Public - An app listed on their App Store, available to the general public. Subscriptions, on-demand billing through Shopify
- Private - An app not listed on their App Store, that you would provide to a single customer

Shopify Integration Workflow

1. Create application through [Shopify Partner Program](https://www.shopify.com/partners)

- App info: name, contact email, etc
- URLs:
  - App URL: `https://yourdomain.com/yourprojectid/us-central1/app/api/auth/shopify`
  - Allowed redirection URL(s): `https://yourdomain.com/yourprojectid/us-central1/app/api/auth/shopify/callback`
- Create API Key & API Secret Key
- Extensions - Admin, Flow, Kit, Online Store, Point of Sale
  - Eg. App proxy (Online Store)

Installation Workflow:

2. Shopify loads the OAuth grant screen, displaying your required scopes, waits for user confirmation

3. OAuth grant screen redirects to App URL

- On installation of the application, and any other time the user clicks the App from the merchant's Shopify Admin UI
-

Subsequent Navigation to App:

4. Shopify routes to `${AppURL}?shop=shopname.myshopify.com&hmac=...&timestamp=...`

- Shopify requires you to compile a URL and redirect to it
- https://{shop}/admin/oauth/authorize?client_id={api_key}&scope={scopes}&redirect_uri={redirect_uri}&state={nonce}&grant_options[]={access_mode}
- Part of this is a requirement to generate a `nonce` (random value) that I must cross reference in Shopify's callback, which we'll persist in `req.session`
- We are using the `shopify-token` npm library that Shopify recommends, to simplify things quite a bit for us:

```javascript
// functions/api/auth.js
router.get("/shopify", (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(401).send("Must provide a valid Shopify domain");
  // 1. Initialize ShopifyToken

  const shopifyToken = new ShopifyToken({
    redirectUri: config.SHOPIFY_REDIRECT_URL,
    sharedSecret: config.SHOPIFY_API_SECRET_KEY,
    apiKey: config.SHOPIFY_API_KEY,
    shop: req.query.shop,
  });

  // 2. Generate nonce
  const nonce = shopifyToken.generateNonce();

  // 3. Generate authorization URL
  const uri = shopifyToken.generateAuthUrl(shop, "read_products", nonce);

  // 4. Save the nonce to verify it later
  req.session.state = nonce;
  res.redirect(uri);
});
```

5. Shopify responds to `${AppUrl}/callback?code=...&shop=...&state=...`

- Here you have to verify the nonce (state) is the same that my app provided initially and the Hmac calculates out correctly
- The `code` query parameter is then used to make a `POST` request to Shopify's oAuth route and exchange the authorization code for a permanent access token, which will allow us to authenticate to their store through the Shopify API
- Again we use `shopify-token` to simplify things for us nicely
- Once we have everything we need, we'll redirect to the frontend URL to the `/shopify-login` route, passing `shop` and `token` via query parameters

```javascript
router.get("/shopify/callback", (req, res) => {
  const { code, shop, state } = req.query;
  const shopifyToken = new ShopifyToken({ ... });

  if (
    typeof state !== "string" ||
    state !== req.session.state || // Validate that the state (nonce) is the same
    !shopifyToken.verifyHmac(req.query) // Validate the Hmac calculates properly
  ) {
    return res.status(400).send("Shopify integration security checks failed");
  }

  // Exchange the authorization code for a permanent access token.
  shopifyToken
    .getAccessToken(shop, code)
    .then((data) => {
      const token = data.access_token;
      req.session.token = token;
      req.session.state = undefined;
      res.redirect(
        `${config.CLIENT_URL}/shopify-login?shop=${shop}&token=${token}`
      );
    })
    .catch((err) => {
      ...
      res.status(500).send("Something went wrong integrating to Shopify");
    });
});
```

6. Frontend ShopifyLogin component makes direct Firestore calls to persist the integration details for the user

- Path to component: `client\src\Components\Auth\ShopifyLogin.js`
- `/shopify-login` is a PrivateRoute, defined in `client\src\Routes`, that will require user to login or signup if they aren't already, and then forward the user onward, maintaining their "from" state
- With the user info on-hand, the component queries Firestore for an exact, existing integration. If none exists, it creates it, if one does exist, it simply proceeds to the success handler
- On success, redirect user to somewhere eg. "/"
