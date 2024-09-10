import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

// npm i --save @fortawesome/pro-solid-svg-icons
// npm i --save @fortawesome/pro-regular-svg-icons
// npm i --save @fortawesome/pro-light-svg-icons
// npm i --save @fortawesome/pro-duotone-svg-icons
// npm i --save @fortawesome/free-brands-svg-icons
//  these are to install in terminal

const Header = () => {
  return (
    <>
      <header className="header">
        <Link to="/">
          <img
            className="logo-img"
            src="https://img.cdnx.in/41613/cat/1674062846875_43279_cat.jpg?height=60&amp;format=webp"
            alt="logo"
          />
        </Link>
        <Link to="/">
          <div className="shop-name">
            <h1 className="text-3xl font-bold">SKV WORLD</h1>
          </div>
        </Link>

        <div>
          <button className="user-icon">
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
          </button>
          <button className="cart-icon">
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
          </button>
          <button className="whatsapp-icon">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </button>
        </div>
      </header>
    </>
  );
};
export default Header;
