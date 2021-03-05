import React from "react";
import qs from "query-string";
import LoginForm from "../Components/LoginForm";

const Login = (props) => {
  // Check for query strings passed from /auth/shopify/callback
  const params = qs.parse(props.location.search);
  const { shop = null, token = null } = params;

  if (shop && token) {
    console.log("Shopify Integration Exists:", { shop, token });
  }

  const handleLogin = (user) => {
    console.log("Login: ", user);
  };

  return (
    <div className=''>
      <h1>Login</h1>
      <LoginForm onSignInSuccess={handleLogin} />
    </div>
  );
};

export default Login;
