import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/movies/${id}`);
      if (!response.ok) throw new Error('Failed to fetch movie');
      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching movie:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (id) => {
    fetchMovieById(id);
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={styles.error}>
        Error: {error}
        <br />
        Make sure JSON Server is running on port 3001
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <div style={styles.container}>
        <button onClick={handleBackToList} style={styles.backButton}>
          Back to All Movies
        </button>
        <div style={styles.detailsContainer}>
          <img
            src={selectedMovie.posterUrl || 'https://via.placeholder.com/300x450'}
            alt={selectedMovie.title}
            style={styles.detailsPoster}
          />
          <div style={styles.detailsInfo}>
            <h2>{selectedMovie.title}</h2>
            <p><strong>Year:</strong> {selectedMovie.year}</p>
            <p><strong>Genre:</strong> {selectedMovie.genre}</p>
            <p><strong>Rating:</strong> ⭐ {selectedMovie.rating}</p>
            <p><strong>Description:</strong></p>
            <p>{selectedMovie.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>All Movies from JSON Server</h1>
      <div style={styles.grid}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)}
            style={styles.card}
          >
            <img
              src={movie.posterUrl || 'https://via.placeholder.com/200x300'}
              alt={movie.title}
              style={styles.poster}
            />
            <h3 style={styles.title}>{movie.title}</h3>
            <p style={styles.year}>{movie.year}</p>
            <p style={styles.rating}>⭐ {movie.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    color: 'red',
    fontSize: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  poster: {
    width: '100%',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  title: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#333',
  },
  year: {
    color: '#666',
    fontSize: '14px',
    margin: '5px 0',
  },
  rating: {
    color: '#f39c12',
    fontWeight: 'bold',
    margin: '5px 0',
  },
  backButton: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px',
  },
  detailsContainer: {
    display: 'flex',
    gap: '30px',
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  detailsPoster: {
    maxWidth: '300px',
    borderRadius: '8px',
  },
  detailsInfo: {
    flex: 1,
  },
};

export default MoviesList;
