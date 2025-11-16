import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  // Sync with external initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(value.trim());
  };

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    onSearch?.(nextValue.trim());
  };

  return (
    <motion.form
      className="search-bar"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FiSearch className="search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search for movies..."
        value={value}
        onChange={handleChange}
      />
      <button type="submit" className="search-bar__submit">
        Search
      </button>
    </motion.form>
  );
};

export default SearchBar;


