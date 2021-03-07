import React from "react";
import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";

import Header from "./Header";
import LoadingScreen from "./LoadingScreen";

const Layout = (props) => {
  const auth = useSelector((store) => store.auth);
  if (auth.isLoading) {
    return <LoadingScreen text='Loading' />;
  }

  return (
    <Flex
      direction='column'
      // align='center'
      // maxW={{ xl: "1200px" }}
      // w='100%'
      // h='100%'
      h='100vh'
      w='100vw'
      m='0 auto'
      {...props}
    >
      <Header />
      {props.children}
    </Flex>
  );
};

export default Layout;
