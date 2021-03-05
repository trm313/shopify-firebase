import React from "react";
import { useSelector } from "react-redux";
import logOut from "../../Actions/logOut";
import { Flex, Box, Button, Link, Spinner } from "@chakra-ui/react";
import NavLink from "../Shared/NavLink";

const AuthButtons = (props) => {
  const auth = useSelector((store) => store.auth);
  const { user, isLoading, isAuthenticated, error } = auth;

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return <Box>Login Error</Box>;
  }

  if (isAuthenticated) {
    return (
      <>
        <NavLink to='/account'>{user.email}</NavLink>
        <NavLink onClick={logOut}>Log Out</NavLink>
      </>
    );
  } else {
    return (
      <NavLink to='/login' size='lg' variant='primary'>
        Login
      </NavLink>
    );
  }
};

export default AuthButtons;
