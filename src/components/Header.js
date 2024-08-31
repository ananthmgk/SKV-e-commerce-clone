import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <>
      <header className="header">
        <img
          className=""
          src="https://img.cdnx.in/41613/cat/1674062846875_43279_cat.jpg?height=60&amp;format=webp"
          alt="logo"
        />
        <div className="header-logo">
          <h1 className="text-3xl font-bold">SKV WORLD</h1>
        </div>
      </header>
      <main id="banner">
        <button>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <img
          src="https://img.cdnx.in/41613/_slider/slide_1713610367107-1713610368936.jpg?width=1920&amp;format=jpeg"
          alt="banner1"
        />
        <button>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </main>
    </>
  );
};
export default Header;
