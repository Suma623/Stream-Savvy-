import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

const transitionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const MovieList = ({ title, movies = [], layout = 'slider', variant }) => {
  if (!movies.length) return null;

  return (
    <section className="movie-section">
      {title ? (
        <motion.div
          className="movie-section__header"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <h2>{title}</h2>
        </motion.div>
      ) : null}

      {layout === 'slider' ? (
        <motion.div
          className="movie-section__slider"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          {movies.map((movie) => (
            <motion.div
              variants={transitionVariants}
              key={`${title}-${movie.id}`}
              className="movie-section__item"
            >
              <MovieCard movie={movie} variant={variant} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="movie-section__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.05 }}
        >
          {movies.map((movie) => (
            <motion.div variants={transitionVariants} key={movie.id}>
              <MovieCard movie={movie} variant={variant} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default MovieList;


