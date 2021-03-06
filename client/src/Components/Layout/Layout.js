import React from "react";
import { useSelector } from "react-redux";

import Header from "./Header";
import LoadingScreen from "./LoadingScreen";

const Layout = (props) => {
  const auth = useSelector((store) => store.auth);
  if (auth.isLoading) {
    return <LoadingScreen text='Loading' />;
  }

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
