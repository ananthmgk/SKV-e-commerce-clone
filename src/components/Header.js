import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "./ImageCarousel";

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
        <img
          className="logo-img"
          src="https://img.cdnx.in/41613/cat/1674062846875_43279_cat.jpg?height=60&amp;format=webp"
          alt="logo"
        />
        <div className="shop-name">
          <h1 className="text-3xl font-bold">SKV WORLD</h1>
        </div>
      </header>
      <main id="banner">
        {/* <button className="left-arrow-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button> */}
        <ImageCarousel />

        {/* <button className="right-arrow-btn">
          <FontAwesomeIcon icon={faArrowRight} />
        </button> */}
      </main>
    </>
  );
};
export default Header;
