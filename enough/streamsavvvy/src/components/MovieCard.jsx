import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/api';
import { useWatchlist } from '../context/WatchlistContext';

const MovieCard = ({ movie, variant = 'poster' }) => {
  const { add, remove, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const title = movie.title || movie.name;
  const releaseYear =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'Unknown';

  const normalizedMovie = {
    id: movie.id,
    title,
    name: movie.name,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    first_air_date: movie.first_air_date,
    media_type: movie.media_type || 'movie',
  };

  const handleWatchlist = () => {
    if (inWatchlist) {
      remove(movie.id);
    } else {
      add(normalizedMovie);
    }
  };

  const poster = getImageUrl(
    variant === 'backdrop' ? movie.backdrop_path : movie.poster_path,
    variant === 'backdrop' ? 'w780' : 'w500'
  );

  return (
    <motion.article
      className={`movie-card movie-card--${variant}`}
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="movie-card__media">
        <Link to={`/movie/${movie.id}`}>
          {poster ? (
            <img
              src={poster}
              alt={`${movie.title} poster`}
              loading="lazy"
              className="movie-card__image"
            />
          ) : (
            <div className="movie-card__placeholder">No image</div>
          )}
        </Link>
        <motion.button
          className={`movie-card__watchlist ${
            inWatchlist ? 'movie-card__watchlist--active' : ''
          }`}
          onClick={handleWatchlist}
          whileTap={{ scale: 0.92 }}
        >
          {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </motion.button>
      </div>

      <div className="movie-card__info">
        <Link
          to={`/${normalizedMovie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}`}
          className="movie-card__title"
        >
          {title}
        </Link>
        <div className="movie-card__meta">
          <span className="movie-card__rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
          <span>{releaseYear}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default MovieCard;


