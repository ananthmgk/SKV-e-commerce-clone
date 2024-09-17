import "../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <>
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Got a question? We’d love to hear from you.</p>
      </div>
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-left">
            <h2>Get in Touch</h2>
            <p>
              Write to us for any information required about our products and
              business.
            </p>
            <div className="contact-info">
              <h3>Address</h3>
              <p>📍 123 Main St, Anytown, Tamil Nadu, India - 000001</p>
              <h3>Email</h3>
              <p>📧 QpDmX@example.com</p>
              <h3>Phone</h3>
              <p>📞 +91 9999999999</p>
              <h3>WhatsApp</h3>
              <p>📱 +91 9999999999</p>
              <h3>Store Timing</h3>
              <p>Mon-Sat: 9AM - 9PM</p>
            </div>
          </div>

          <div className="contact-right">
            <h2>Drop us message</h2>
            <form className="contact-form">
              <input type="text" placeholder="Full Name *" required />
              <input type="text" placeholder="Phone *" required />
              <input type="email" placeholder="Email (Optional)" />
              <textarea placeholder="Message *" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
