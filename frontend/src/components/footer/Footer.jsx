import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    alert("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="modern-footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
            <p className="newsletter-description">
              Get 10% off your first order and stay updated on new products and
              exclusive offers!
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-column">
            <h3 className="footer-brand">StickerVault</h3>
            <p className="footer-description">
              Your premier destination for high-quality, unique stickers that
              express your personality.
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Pinterest"
              >
                <FontAwesomeIcon icon={faPinterest} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li>
                <Link to="/home">All Stickers</Link>
              </li>
              <li>
                <Link to="/home">New Arrivals</Link>
              </li>
              <li>
                <Link to="/home">Best Sellers</Link>
              </li>
              <li>
                <Link to="/home">Collections</Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="footer-column">
            <h4 className="footer-heading">About</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Help</h4>
            <ul className="footer-links">
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="#returns">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} StickerVault. All rights reserved.
          </p>
          <p className="built-with">
            Built with
            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            by
            <a
              href="https://nirobnk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-link"
            >
              nirobnk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
