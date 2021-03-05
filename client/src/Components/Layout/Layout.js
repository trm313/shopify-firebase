import FirebaseAuth from "../Auth/FirebaseAuth";
import logOut from "../../Actions/logOut";

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
