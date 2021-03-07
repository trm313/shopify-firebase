import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import TestComponent from "../Components/TestComponent";
import logo from "../logo.svg";

const HomePage = () => {
  return (
    <Flex flexGrow={1} direction='column' w='100%' align='center'>
      <TestComponent />
      <Flex direction='column' align='center' p={4}>
        <img src={logo} className='_App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='_App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </Flex>
    </Flex>
  );
};

export default HomePage;
