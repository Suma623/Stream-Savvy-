import { motion } from 'framer-motion';

const GenreFilter = ({ genres, activeGenre, onSelect }) => {
  if (!genres.length) return null;

  return (
    <div className="genre-filter">
      <motion.button
        className={`genre-filter__chip ${
          activeGenre === 'all' ? 'genre-filter__chip--active' : ''
        }`}
        onClick={() => onSelect('all')}
        whileTap={{ scale: 0.92 }}
      >
        All
      </motion.button>
      {genres.map((genre) => (
        <motion.button
          key={genre.id}
          className={`genre-filter__chip ${
            activeGenre === genre.id ? 'genre-filter__chip--active' : ''
          }`}
          onClick={() => onSelect(genre.id)}
          whileTap={{ scale: 0.92 }}
        >
          {genre.name}
        </motion.button>
      ))}
    </div>
  );
};

export default GenreFilter;


