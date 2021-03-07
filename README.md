# Setup

## Development Environment / Initial Setup

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

## Production Environment

1. Set environment variables for Firebase functions using `functions ... :set ...`
   ...

# Running Application

## Development

# Deploying Application

## Deploy Frontend

Files must build to a deployment directory (default is "public", changed to "client/build")
Deploy files to hosting via `firebase deploy --only hosting:shopify-firebase-boilerplate`

## Environment variables

Environment variables for consumption by Firebase Functions:

`firebase functions:config:get`

`firebase functions:config:set private.env="dev" stripe.key="[stripe_key]" stripe.secret="[stripe_secret]"`

`firebase functions:config:set private.key="YOUR API KEY" project.id="YOUR CLIENT ID" client.email="YOUR CLIENT EMAIL"`
