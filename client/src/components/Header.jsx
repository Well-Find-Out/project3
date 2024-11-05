import logo from "../assets/logo.png";
import Navigation from "./Navigation";
// import { FaBars } from "react-icons/fa";

function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>World Travellers</div>
          </div>
        </a>
        <Navigation />
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button> */}
      </div>
    </nav>
  );
}

export default Header;
