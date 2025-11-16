import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page page--not-found">
      <motion.div
        className="not-found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="not-found__emoji"
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          🎬
        </motion.span>
        <h1>Lost in the multiverse?</h1>
        <p>
          This page doesn&apos;t exist, but the cinematic universe is vast. Let&apos;s guide you back to the spotlight.
        </p>
        <Link to="/" className="btn btn--primary">
          Return home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;


