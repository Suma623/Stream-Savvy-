import { motion } from 'framer-motion';

const Loader = ({ message = 'Loading cinematic gems...' }) => {
  return (
    <div className="loader">
      <motion.div
        className="loader__spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      />
      <p>{message}</p>
    </div>
  );
};

export default Loader;


