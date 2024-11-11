import { NavLink } from "react-router-dom";
import Auth from "../utils/auth";

const Navigation = () => {
  if (Auth.loggedIn()) {
    return (
      <div className="flex-row">
        <NavLink to="/" className="mx-1 navbar-brand">
          Home
        </NavLink>
        <NavLink to="/profile" className="mx-1 navbar-brand">
          Profile
        </NavLink>
        <NavLink to="/users" className="mx-1 navbar-brand">
          Authors
        </NavLink>
        <NavLink to="/about" className="mx-1 navbar-brand">
          About
        </NavLink>
        <NavLink
          to="/"
          className="mx-1 navbar-brand"
          onClick={() => Auth.logout()}
        >
          Logout
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="flex-row navbar-brand">
        <NavLink to="/" className="mx-1 navbar-brand">
          Home
        </NavLink>
        <NavLink to="/users" className="mx-1 navbar-brand">
          Authors
        </NavLink>
        <NavLink to="/about" className="mx-1 navbar-brand">
          About
        </NavLink>
        <NavLink to="/signup" className="mx-1 navbar-brand">
          Signup
        </NavLink>
        <NavLink to="/login" className="mx-1 navbar-brand">
          Login
        </NavLink>
      </div>
    );
  }
};

export default Navigation;
