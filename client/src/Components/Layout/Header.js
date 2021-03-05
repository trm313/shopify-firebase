import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Box, Button, Link } from "@chakra-ui/react";
import NavLink from "../Shared/NavLink";
import logOut from "../../Actions/logOut";
import FirebaseAuth from "../Auth/FirebaseAuth";

const Header = (props) => {
  return (
    <Flex
      bg='brand.100'
      w='100%'
      justify='space-between'
      align='center'
      py='1em'
      px='3em'
      minH={20}
    >
      <Box>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/account'>Account</NavLink>
        <NavLink to='slug-123'>Some Post</NavLink>
      </Box>
      <Box>
        <FirebaseAuth>
          {({ isLoading, error, auth }) => {
            if (isLoading) {
              return <Box>Loading</Box>;
            }
            if (error) {
              return <Box>Login Error</Box>;
            }
            if (auth) {
              return (
                <>
                  <NavLink to='/account'>Profile</NavLink>
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
          }}
        </FirebaseAuth>
      </Box>
    </Flex>
  );
};

export default Header;
