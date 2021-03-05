import React from "react";

import Header from "./Header";

const Layout = (props) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
