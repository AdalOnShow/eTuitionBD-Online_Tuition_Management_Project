import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="max-w-11/12 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-content">
                  eT
                </span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">eTuition</span>
                <span className="text-secondary">BD</span>
              </span>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Bangladesh's leading tuition management platform connecting
              students with verified tutors across the country.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/adalonshow"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
              >
                <FiGithub />
              </a>
              <a
                href="https://twitter.com/sharif.h.adal"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
              >
                <FiTwitter />
              </a>
              <a
                href="https://www.instagram.com/sharif.h.adal"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
              >
                <FiInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/adalonshow/"
                className="btn btn-circle btn-sm btn-ghost hover:btn-primary"
              >
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="link link-hover text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tuitions" className="link link-hover text-sm">
                  Browse Tuitions
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="link link-hover text-sm">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link-hover text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="link link-hover text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/help" className="link link-hover text-sm">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/register" className="link link-hover text-sm">
                  Become a Tutor
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students & Tutors */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="link link-hover text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="#" className="link link-hover text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <Link to="/privacy" className="link link-hover text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <FiMapPin className="mt-1 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FiPhone className="shrink-0" />
                <span>+880 1878-888820</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <FiMail className="shrink-0" />
                <span>info@etuitionbd.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Business Hours</p>
              <p className="text-sm text-base-content/70">
                Sat - Thu: 9:00 AM - 6:00 PM
                <br />
                Friday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-content/10">
        <div className="max-w-11/12 mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/70">
            <p>© 2024 eTuitionBD. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="link link-hover">
                Privacy
              </a>
              <a href="#" className="link link-hover">
                Terms
              </a>
              <a href="#" className="link link-hover">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
