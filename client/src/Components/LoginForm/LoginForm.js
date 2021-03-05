import React from "react";
import ReactGA from "react-ga";
import Firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const LoginForm = ({ onSignInSuccess }) => {
  // FirebaseUI Config
  const uiConfig = {
    // Disable Account Chooser redirect
    credentialHelper: "none",
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        const { user } = authResult;
        // var credential = authResult.credential;
        // var isNewUser = authResult.additionalUserInfo.isNewUser;
        // var providerId = authResult.additionalUserInfo.providerId;
        // var operationType = authResult.operationType;

        ReactGA.event({
          category: "User",
          action: "Log in",
        });

        // console.log(user);
        const { displayName, email, emailVerified, uid } = user;

        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.

        onSignInSuccess({ displayName, email, emailVerified, uid });

        // return true; // would redirect
        return false; // Don't redirect
      },
    },

    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // Signin Providers
    signInOptions: [
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
  };

  return (
    <div className='w-full py-4 bg-gray-100 border-t border-gray-200 text-gray-700'>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()} />
    </div>
  );
};

export default LoginForm;
