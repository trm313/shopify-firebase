import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { Flex, Text, Heading } from "@chakra-ui/react";
import NavLink from "../Components/Shared/NavLink";

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
  }, [auth, props.location?.state?.from]);

  return (
    <Flex w='100vw' h='100vh' position='absolute' top={0} left={0}>
      <Flex
        direction='column'
        align='center'
        justify='flex-start'
        bg='brand.800'
        color='white'
        w='40%'
      >
        <NavLink to='/' variant='secondary'>
          Back to homepage
        </NavLink>
        <Flex direction='column' align='center' justify='center' flexGrow={1}>
          <Heading as='h1' size='2xl'>
            Shopify App
          </Heading>
          <Text fontSize='lg'>Boilerplate: React, Firebase</Text>
        </Flex>
      </Flex>
      <Flex
        bg='white'
        color='gray.900'
        w='60%'
        direction='column'
        align='center'
        justify='center'
      >
        <h1>Login</h1>
        <LoginForm onSignInSuccess={handleLogin} />
        {redirectTo && <Redirect to={redirectTo} />}
      </Flex>
    </Flex>
  );
};

export default Login;
