import Firebase from "firebase/app";
import { FirestoreProvider } from "react-firestore";
import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import ReactGA from "react-ga";
import { BrowserRouter, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { authenticate, logout } from "./Reducers/authReducer";

import theme from "./Styles/theme";

import Routes from "./Routes";
import Layout from "./Components/Layout";

import "./App.css";

const App = ({ authenticate, logout }) => {
  useEffect(() => {
    // Initialize Firebase authentication listener
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, emailVerified, uid } = user;
        authenticate({ displayName, email, emailVerified, uid });
      }

      if (!user) {
        logout();
      }
    });
  }, []);
  return (
    <FirestoreProvider firebase={Firebase}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            {/* <Route path='/' component={ScrollToTop} />
          <Route path='/' component={Analytics} /> */}
            <Routes />
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </FirestoreProvider>
  );
};

// scroll to top on route change
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md#scroll-to-top
// class ScrollToTop extends React.Component {
//   componentDidUpdate(prevProps) {
//     if (this.props.location !== prevProps.location) {
//       window.scrollTo(0, 0)
//     }
//   }
//   render() {
//     return null
//   }
// }

// Track Google Analytics page view for every route
// https://github.com/react-ga/react-ga/issues/122#issuecomment-319546248
// const Analytics = ({location}) => {
//   const page = location.pathname + location.search
//   ReactGA.set({ page })
//   ReactGA.pageview(page)
//   return null
// }

// export default App;
const mapDispatch = {
  authenticate,
  logout,
};
export default connect(null, mapDispatch)(App);
