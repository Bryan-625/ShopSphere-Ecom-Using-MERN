import "../Navbar/Navbar.css";
import navlogo from "../../assets/logo.png";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo-and-text">
          <img className="nav-logo" src={navlogo} alt="nav-logo" />
          <div className="navbar-text">
            <div className="navbar-text-one">
              <h1 id="navbar-text-one-first">Shop</h1>
              <h1  id="navbar-text-one-second">Sphere</h1>
            </div>
            <div className="navbar-text-two">
              <h4>Admin Panel</h4>
            </div>
          </div>
        </div>

        <img className="nav-profile" src={navProfile} alt="nav-profile" />
      </div>
    </>
  );
};

export default Navbar;
