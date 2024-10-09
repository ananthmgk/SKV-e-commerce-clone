import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logo/Skv logo.webp";
import { useEffect, useState } from "react";

// npm i --save @fortawesome/pro-solid-svg-icons
// npm i --save @fortawesome/pro-regular-svg-icons
// npm i --save @fortawesome/pro-light-svg-icons
// npm i --save @fortawesome/pro-duotone-svg-icons
// npm i --save @fortawesome/free-brands-svg-icons
//  these are to install in terminal

const Header = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Listen for cart updates in localStorage to keep count updated
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/">
          <img className="header-logo-img" src={logo} alt="logo" />
        </Link>
        <Link to="/">
          <div className="header-shop-name">
            <h1 className="title-name">SKV WORLD</h1>
            <p className="sub-title">Pocket-friendly shop</p>
          </div>
        </Link>
      </div>

      <div className="header-right">
        <Link to="/account">
          <button className="header-user-icon">
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
          </button>
        </Link>
        <Link to="/cart">
          <button className="header-cart-icon">
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
            <span className="cart-count">{cartItems.length}</span>
          </button>
        </Link>
        {/* <Link to="/whatsapp">
          <button className="header-whatsapp-icon">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </button>
        </Link> */}
      </div>
    </header>
  );
};
export default Header;
