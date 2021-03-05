import React from "react";
import { useSelector } from "react-redux";
import { Flex, Box, Button, Link, Spinner } from "@chakra-ui/react";
import NavLink from "../Shared/NavLink";

import AuthButtons from "../Auth/AuthButtons";

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
        <AuthButtons />
      </Box>
    </Flex>
  );
};

export default Header;
