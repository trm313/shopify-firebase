import Firebase from "firebase/app";
import ReactGA from "react-ga";

const logOut = () => {
  ReactGA.event({
    category: "User",
    action: "Log out",
  });

  // Firebase.auth().signOut();
  // history.something = "/" // TODO: Redirect

  return Firebase.auth().signOut();
};

export default logOut;
