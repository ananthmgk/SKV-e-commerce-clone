import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-quick-links">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About us</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="footer-contact-info">
        <h4>Get In Touch</h4>
        <ul>
          <li>Phone: +91 9999999999</li>
          <li>Email: QpDmX@example.com</li>
          <li>Address: 123 Main St, Anytown, India</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
