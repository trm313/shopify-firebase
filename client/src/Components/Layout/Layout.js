import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='account'>Account</Link>
        <Link to='slug-123'>Some Post</Link>
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
