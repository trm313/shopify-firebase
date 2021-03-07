---


---

<h1 id="setup">Setup</h1>
<h2 id="installation">Installation</h2>
<p><strong>Repo setup</strong></p>
<ol>
<li>Clone repository</li>
<li>Run <code>npm install</code> in the root, <code>client</code>, <code>scripts</code>, and <code>functions</code> directories</li>
</ol>
<p><strong>Shopify setup</strong></p>
<ol>
<li>…</li>
</ol>
<p><strong>Firebase setup</strong></p>
<ol>
<li>Create your Firebase project. Resources we will be using:</li>
</ol>
<ul>
<li>Authentication (Google provider)</li>
<li>Cloud Firestore</li>
<li>Hosting</li>
<li>Functions (will require upgrade to Blaze pay-as-you-go plan - it has good free quotas and billing alerts, so no surprises)</li>
</ul>
<ol>
<li>Copy/rename <code>functions\.runtimeconfig.example.json</code> to <code>functions\.runtimeconfig.json</code> and populate with environment variables for your local development environment</li>
<li>Copy/rename <code>client\.env.example</code> to <code>client\.env</code> and populate with environment variables to be leveraged by the React client (TODO: Figure out how to deploy these to Firebase hosting)</li>
</ol>
<h2 id="development-environment">Development Environment</h2>
<ol>
<li>TODO</li>
</ol>
<h2 id="production-environment">Production Environment</h2>
<ol>
<li>Set environment variables for Firebase functions using <code>functions ... :set ...</code><br>
…</li>
</ol>
<h1 id="deploying-application">Deploying Application</h1>
<h2 id="deploy-frontend">Deploy Frontend</h2>
<p>Files must build to a deployment directory (default is “public”, changed to “client/build”)<br>
Deploy files to hosting via <code>firebase deploy --only hosting:shopify-firebase-boilerplate</code></p>
<h2 id="environment-variables">Environment variables</h2>
<p>Environment variables for consumption by Firebase Functions:</p>
<p><code>firebase functions:config:get</code></p>
<p><code>firebase functions:config:set private.env="dev" stripe.key="[stripe_key]" stripe.secret="[stripe_secret]"</code></p>
<p><code>firebase functions:config:set private.key="YOUR API KEY" project.id="YOUR CLIENT ID" client.email="YOUR CLIENT EMAIL"</code></p>
<h1 id="how-it-works">How It Works</h1>
<h2 id="architecture-overview">Architecture Overview</h2>
<ul>
<li>
<p>React front-end, built via create-react-app</p>
<ul>
<li>Firebase Web - Internal app authentication &amp; CRUD operations
<ul>
<li>Authentication - Firebase auth listener that triggers userReducer actions managed in <code>client\src\App.js</code></li>
</ul>
</li>
<li><a href="https://chakra-ui.com/docs/features/style-props">Chakra UI</a> - Very flexible UI framework
<ul>
<li><a href="https://chakra-ui.com/docs/features/style-props">Style Props</a> - Tailwindcss-like utility inline styling</li>
<li>Theming extended from <code>client\src\Styles\theme.js</code></li>
<li>Create custom Components like <code>client\src\Styles\Components\NavLink.js</code></li>
</ul>
</li>
<li><a href="">React-Router-Dom</a> - Defined in <code>client\src\Routes</code></li>
<li><a href="https://redux-toolkit.js.org/">Redux-Toolkit</a> - Authentication managed through Redux store
<ul>
<li>Reducers: <code>client\src\Reducers</code></li>
<li>Initalized: <code>client\src\index.js</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p>Firebase Functions</p>
<ul>
<li>
<p><a href="https://firebase.google.com/docs/functions/use-cases?authuser=0">What can I do with Cloud Functions?</a></p>
</li>
<li>
<p>Trigger background functions (eg. <code>Firebase.auth.user().onCreate((user) =&gt; {...})</code>)</p>
</li>
<li>
<p>Call functions directly from Web</p>
<pre><code>// 1. `client\src\index.js` - Initialize Cloud Functions through Firebase
firebase.initializeApp({ ... });
var functions = firebase.functions();

// 2. `client\src\Components\TextComponent` - Load Firebase and call directly
import Firebase from "firebase/app";
var addMessage = Firebase.functions().httpsCallable('addMessage');

addMessage({ text: messageText })
.then((result) =&gt; {
  // Read result of the Cloud Function.
var sanitizedMessage = result.data.text;
}).catch (error =&gt; {
  const { code, message, details } = error;
})

</code></pre>
</li>
<li>
<p>Call functions via HTTP requests</p>
<pre><code>// https://firebase.google.com/docs/functions/http-events?authuser=0

</code></pre>
</li>
<li>
<p>Host API routes (Currently eg. <code>/auth/shopify</code> and <code>/auth/shopifycallback</code>)</p>
<ul>
<li>Note: This probably should be done through calling Firebase Functions via HTTP, but shows some flexibility</li>
</ul>
</li>
</ul>
</li>
<li>
<p>Firebase Firestore</p>
<ul>
<li>Document store</li>
</ul>
</li>
<li>
<p>Integrations</p>
<ul>
<li>Shopify - This boilerplate can serve as a grab-and-go Shopify Public App</li>
</ul>
</li>
</ul>
<h1 id="integrations">Integrations</h1>
<h2 id="shopify">Shopify</h2>
<p>Shopify has a very nice app ecosystem. A Shopify app is simply a website that follows certain authentication protocols, so it’s very flexible about any technologies you want to use. They have some great resources and walkthroughs as well.</p>
<p>There are two types of Shopify apps:</p>
<ul>
<li>Public - An app listed on their App Store, available to the general public. Subscriptions, on-demand billing through Shopify</li>
<li>Private - An app not listed on their App Store, that you would provide to a single customer</li>
</ul>
<p>Shopify Integration Workflow</p>
<p>New Test!!</p>

