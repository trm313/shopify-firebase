import React from "react";
import { Flex } from "@chakra-ui/react";

import Layout from "../Components/Layout";
import TestComponent from "../Components/TestComponent";
import logo from "../logo.svg";

const HomePage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default HomePage;
