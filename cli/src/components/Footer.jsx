import './Footer.css'; // Add styles specifically for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 CodeMaster. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-socials">
        <a href="#" className="social-link">Facebook</a>
        <a href="#" className="social-link">Twitter</a>
        <a href="#" className="social-link">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
