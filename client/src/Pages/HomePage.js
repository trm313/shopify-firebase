import React, { useEffect, useState } from "react";

import TestComponent from "../Components/TestComponent";
import logo from "../logo.svg";

const HomePage = () => {
  return (
    <header className='App-header'>
      <TestComponent />
      <img src={logo} className='App-logo' alt='logo' />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className='App-link'
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        Learn React
      </a>
    </header>
  );
};

export default HomePage;
