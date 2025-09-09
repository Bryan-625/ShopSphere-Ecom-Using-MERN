import "../Navbar/Navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import nav_drop_down from "../assets/nav_dropdown.png";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const location = useLocation();
  const [menubar, setMenubar] = useState("shop");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown
  const menuRef = useRef();

  const { getTotalCartItems } = useContext(ShopContext);

  const dropdown_toggle = (event) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    event.target.classList.toggle("open");
    setIsDropdownOpen(!isDropdownOpen); // Update state
  };

  // Sync active menu with URL
  useEffect(() => {
    if (location.pathname === "/") setMenubar("shop");
    else if (location.pathname === "/mens") setMenubar("mens");
    else if (location.pathname === "/womens") setMenubar("womens");
    else if (location.pathname === "/kids") setMenubar("kids");
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && isDropdownOpen) {
        // Close dropdown automatically on larger screens
        menuRef.current.classList.remove("nav-menu-visible");
        setIsDropdownOpen(false);
        const dropdownIcon = document.querySelector(".nav-dropdown");
        if (dropdownIcon) dropdownIcon.classList.remove("open");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isDropdownOpen]);

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <Link to="/"><img src={logo} alt="Website-logo" /></Link>

          <p className="website-logo-text1">Shop</p>
          <p className="website-logo-text2">Sphere</p>
        </div>

        <img
          className="nav-dropdown"
          onClick={dropdown_toggle}
          src={nav_drop_down}
          alt="drop-down-icon"
        />

        <ul ref={menuRef} className="nav-menu">
          <li onClick={() => setMenubar("shop")}>
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>
            {menubar === "shop" && <hr />}
          </li>
          <li onClick={() => setMenubar("mens")}>
            <Link style={{ textDecoration: "none" }} to="/mens">
              Men
            </Link>
            {menubar === "mens" && <hr />}
          </li>
          <li onClick={() => setMenubar("womens")}>
            <Link style={{ textDecoration: "none" }} to="/womens">
              Women
            </Link>
            {menubar === "womens" && <hr />}
          </li>
          <li onClick={() => setMenubar("kids")}>
            <Link style={{ textDecoration: "none" }} to="/kids">
              Kids
            </Link>
            {menubar === "kids" && <hr />}
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

      {/* Spacer to push page content down when dropdown opens */}
      <div
        style={{
          height: isDropdownOpen
            ? menuRef.current?.offsetHeight + -1 + "px"
            : "0px",
          transition: "height 0.3s ease",
        }}
      ></div>
    </>
  );
};

export default Navbar;
