import { NavLink, useLocation } from "react-router-dom";
import Auth from "../utils/auth";


const Navigation = () => {
  if (Auth.loggedIn()) {
    return (
      <div className="flex-row">
        <NavLink to="/" className="mx-1">
          Home
        </NavLink>
        <NavLink to="/profile" className="mx-1">
          Profile
        </NavLink>
        {/* <NavLink to="/create" className="mx-1">
          Add Travel Post
        </NavLink> */}
        <NavLink to="/users" className="mx-1">
          Authors
        </NavLink>
        <NavLink to="/about" className="mx-1">
          About
        </NavLink>
        <NavLink to="/" className="mx-1" onClick={() => Auth.logout()}>
          Logout
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="flex-row">
        <NavLink to="/" className="mx-1">
          Home
        </NavLink>
        <NavLink to="/users" className="mx-1">
          Authors
        </NavLink>
        <NavLink to="/about" className="mx-1">
          About
        </NavLink>
        <NavLink to="/signup" className="mx-1">
          Signup
        </NavLink>
        <NavLink to="/login" className="mx-1">
          Login
        </NavLink>

      </div>
    );
  }
};

export default Navigation;
