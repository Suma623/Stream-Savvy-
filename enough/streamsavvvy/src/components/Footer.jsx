import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com', label: 'GitHub' },
  { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <FiInstagram />, href: 'https://instagram.com', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div
        className="footer__content"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="footer__branding">
          <span className="footer__logo">🎥 StreamSavvy</span>
          <p>Cinematic experiences, delivered in ultra streaming definition.</p>
        </div>

        <div className="footer__social">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="footer__meta">
          <span>StreamSavvy © 2025</span>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
          >
            Powered by TMDB API
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;


