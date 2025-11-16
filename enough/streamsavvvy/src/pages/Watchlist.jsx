import { motion } from 'framer-motion';
import MovieList from '../components/MovieList';
import EmptyState from '../components/EmptyState';
import { useWatchlist } from '../context/WatchlistContext';

const Watchlist = () => {
  const { items } = useWatchlist();

  return (
    <div className="page page--watchlist">
      <motion.div
        className="page__header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Your Watchlist</h1>
        <p>
          Save movies to watch later. We keep everything synced across your browser using
          local storage magic.
        </p>
      </motion.div>

      {items.length ? (
        <MovieList title="" movies={items} layout="grid" variant="poster" />
      ) : (
        <EmptyState
          title="Your watchlist is empty"
          message="Add movies from the homepage or search results to build your personal queue."
          ctaLabel="Discover titles"
          ctaHref="/"
        />
      )}
    </div>
  );
};

export default Watchlist;


