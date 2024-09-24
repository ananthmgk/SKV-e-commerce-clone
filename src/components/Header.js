import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logo/Skv logo.webp";

// npm i --save @fortawesome/pro-solid-svg-icons
// npm i --save @fortawesome/pro-regular-svg-icons
// npm i --save @fortawesome/pro-light-svg-icons
// npm i --save @fortawesome/pro-duotone-svg-icons
// npm i --save @fortawesome/free-brands-svg-icons
//  these are to install in terminal

const Header = () => {
  return (
    <>
      <header className="app-header">
        <Link to="/">
          <img className="header-logo-img" src={logo} alt="logo" />
        </Link>
        <Link to="/">
          <div className="header-shop-name">
            <h1 className="text-3xl font-bold">SKV WORLD</h1>
          </div>
        </Link>

        <div>
          <Link to="/account">
            <button className="header-user-icon">
              <FontAwesomeIcon icon={faCircleUser} size="2x" />
            </button>
          </Link>
          <Link to="/cart">
            <button className="header-cart-icon">
              <FontAwesomeIcon icon={faCartShopping} size="2x" />
            </button>
          </Link>
          <Link to="/whatsapp">
            <button className="header-whatsapp-icon">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;
