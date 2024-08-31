import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="quick-links">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/contact-us">Contact Us</a>
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
