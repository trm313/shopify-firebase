import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import logIn from "../Actions/logIn";
import LoginForm from "../Components/LoginForm";

const Login = (props) => {
  const auth = useSelector((store) => store.auth);
  const [redirectTo, setRedirectTo] = useState(null);
  const handleLogin = (user) => {
    logIn(user);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Redirect user to the path they are coming from, retain query parameters
      let path = "/";
      if (props.location?.state?.from) {
        path =
          props.location.state.from.pathname + props.location.state.from.search;
      }
      setRedirectTo(path);
    }
  }, [auth]);

  return (
    <div className=''>
      <h1>Login</h1>
      <LoginForm onSignInSuccess={handleLogin} />
      {redirectTo && <Redirect to={redirectTo} />}
    </div>
  );
};

export default Login;
