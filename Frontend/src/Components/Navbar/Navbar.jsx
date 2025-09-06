import "../Navbar/Navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const location = useLocation();
  const [menubar, setMenubar] = useState("shop");

  const { getTotalCartItems } = useContext(ShopContext);

  // Sync state with URL on load/refresh
  useEffect(() => {
    if (location.pathname === "/") {
      setMenubar("shop");
    } else if (location.pathname === "/mens") {
      setMenubar("mens");
    } else if (location.pathname === "/womens") {
      setMenubar("womens");
    } else if (location.pathname === "/kids") {
      setMenubar("kids");
    }
  }, [location.pathname]);

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="Website-logo" />
          <p className="website-logo-text1">Shop</p>
          <p className="website-logo-text2">Sphere</p>
        </div>
        <ul className="nav-menu">
          <li
            onClick={() => {
              setMenubar("shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>{" "}
            {menubar == "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenubar("mens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/mens">
              Men
            </Link>{" "}
            {menubar == "mens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenubar("womens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/womens">
              Women
            </Link>{" "}
            {menubar == "womens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenubar("kids");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
              Kids
            </Link>{" "}
            {menubar == "kids" ? <hr /> : <></>}
          </li>
        </ul>
        <div className="nav-login-cart">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/cart">
            <img src={cart_icon} alt="Cart-icon" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
