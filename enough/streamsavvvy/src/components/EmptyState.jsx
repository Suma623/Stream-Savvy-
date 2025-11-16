import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmptyState = ({
  title = 'Nothing to show yet',
  message = 'Start exploring and add something to your watchlist.',
  ctaLabel = 'Browse titles',
  ctaHref = '/',
}) => {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3>{title}</h3>
      <p>{message}</p>
      <Link to={ctaHref} className="btn btn--primary">
        {ctaLabel}
      </Link>
    </motion.div>
  );
};

export default EmptyState;


