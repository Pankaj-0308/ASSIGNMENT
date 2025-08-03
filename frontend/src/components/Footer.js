import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🚀 Mini LinkedIn</h3>
          <p>
            A modern professional networking platform where you can connect, share insights, 
            and grow your career. Build meaningful connections and showcase your expertise 
            in a professional environment.
          </p>
          <div className="social-links">
            <a href="#" title="LinkedIn" aria-label="LinkedIn">💼</a>
            <a href="#" title="Twitter" aria-label="Twitter">🐦</a>
            <a href="#" title="GitHub" aria-label="GitHub">💻</a>
            <a href="#" title="Email" aria-label="Email">📧</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>🔗 Quick Links</h3>
          <ul>
            <li><Link to="/">🏠 Home</Link></li>
            <li><Link to="/profile">👤 Profile</Link></li>
            <li><Link to="/login">🔑 Login</Link></li>
            <li><Link to="/register">📝 Register</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>✨ Features</h3>
          <ul>
            <li><a href="#">✏️ Create Posts</a></li>
            <li><a href="#">🤝 Connect with Users</a></li>
            <li><a href="#">🖼️ Share Images</a></li>
            <li><a href="#">❤️ Like & Interact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>🛠️ Support</h3>
          <ul>
            <li><a href="#">❓ Help Center</a></li>
            <li><a href="#">📞 Contact Us</a></li>
            <li><a href="#">🔒 Privacy Policy</a></li>
            <li><a href="#">📋 Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Mini LinkedIn Platform. All rights reserved.</p>
        <p>Built with ❤️ using React, Node.js, and MongoDB</p>
      </div>
    </footer>
  );
};

export default Footer; 