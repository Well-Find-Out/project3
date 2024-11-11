import logo from "../assets/logo_earth.png";
import Navigation from "./Navigation";

function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div className="fs-2">World Travellers</div>
          </div>
        </a>
        <Navigation />
      </div>
    </nav>
  );
}

export default Header;
