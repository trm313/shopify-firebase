import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, Icon } from "@chakra-ui/react";
import { MdMenu, MdClose } from "react-icons/md";
import NavLink from "../Shared/NavLink";
import AuthButtons from "../Auth/AuthButtons";

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={8}
      py={4}
      px={8}
      bg={["brand.800", "brand.800", "transparent", "transparent"]}
      color={["white", "white", "gray.800", "gray.800"]}
      borderBottom={["none", "none", "1px", "1px"]}
      borderColor={["none", "none", "gray.200", "gray.200"]}
      {...props}
    >
      <Flex align='center'>
        <NavLink to='/' variant='headerSecondary'>
          Logo
        </NavLink>
      </Flex>

      <Box
        display={{ base: "block", md: "none" }}
        cursor='pointer'
        onClick={toggleMenu}
      >
        {show ? (
          <Icon as={MdClose} w={6} h={6} />
        ) : (
          <Icon as={MdMenu} w={6} h={6} />
        )}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align='center'
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          wrap={{ base: "no-wrap", md: "wrap" }}
          pt={[4, 4, 0, 0]}
        >
          <NavLink to='/' variant='headerSecondary'>
            Home
          </NavLink>
          <NavLink to='/slug-123' variant='headerSecondary'>
            Slug
          </NavLink>
          <NavLink to='/pricing' variant='headerSecondary'>
            Pricing
          </NavLink>
          <Box mb={{ base: 0, sm: 0 }} mr={{ base: 0, sm: 0 }} display='block'>
            <AuthButtons />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
