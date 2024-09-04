import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="quick-links">
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
      <div className="contact-info">
        <h4>Get In Touch</h4>
        <p>Phone: +91 9999999999</p>
        <p>Email: QpDmX@example.com</p>
        <p>Address: 123 Main St, Anytown, India</p>
      </div>
      <div className="social-links">
        <h4>We Accept</h4>
        <ul>
          <li>Visa</li>
          <li>MasterCard</li>
          <li>UPI</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
