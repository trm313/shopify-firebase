## Deploy Frontend

Files must build to a deployment directory (default is "public", changed to "client/build")
Deploy files to hosting via `firebase deploy --only hosting:shopify-firebase-boilerplate`

## Environment variables

Environment variables for consumption by Firebase Functions:
`firebase functions:config:set private.key="YOUR API KEY" project.id="YOUR CLIENT ID" client.email="YOUR CLIENT EMAIL"`
