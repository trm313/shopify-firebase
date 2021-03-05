import React from "react";

import logIn from "../Actions/logIn";
import LoginForm from "../Components/LoginForm";

const Login = (props) => {
  const handleLogin = (user) => {
    logIn(user);
  };

  return (
    <div className=''>
      <h1>Login</h1>
      <LoginForm onSignInSuccess={handleLogin} />
    </div>
  );
};

export default Login;
