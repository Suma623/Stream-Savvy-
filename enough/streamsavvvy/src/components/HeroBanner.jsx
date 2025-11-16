import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getBackdropUrl } from '../utils/api';

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  const backdrop = getBackdropUrl(
    movie.backdrop_path || movie.poster_path,
    'w1280'
  );

  return (
    <section className="hero">
      {backdrop && (
        <motion.div
          className="hero__background"
          style={{ backgroundImage: `url(${backdrop})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      )}

      <div className="hero__overlay" />

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="hero__tagline">Stream the latest cinematic adventures</p>
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__meta">
          {movie.vote_average ? (
            <>
              <span className="hero__rating">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
            </>
          ) : null}
          {movie.release_date ? (
            <>
              <span>•</span>
              <span>{movie.release_date.slice(0, 4)}</span>
            </>
          ) : null}
          {movie.runtime ? (
            <>
              <span>•</span>
              <span>{movie.runtime} min</span>
            </>
          ) : null}
        </p>
        <p className="hero__overview">{movie.overview}</p>

        <div className="hero__actions">
          <Link to={`/movie/${movie.id}`} className="btn btn--primary">
            Watch Now
          </Link>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
          >
            Powered by TMDB
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;


