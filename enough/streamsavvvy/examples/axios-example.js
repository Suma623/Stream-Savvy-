import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const moviesApi = {
  getAllMovies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getMovieById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie ${id}:`, error);
      throw error;
    }
  },

  addMovie: async (movieData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/movies`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error adding movie:', error);
      throw error;
    }
  },

  updateMovie: async (id, movieData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      console.error(`Error updating movie ${id}:`, error);
      throw error;
    }
  },

  partialUpdateMovie: async (id, updates) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/movies/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error partially updating movie ${id}:`, error);
      throw error;
    }
  },

  deleteMovie: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/movies/${id}`);
      return { success: true, message: `Movie ${id} deleted` };
    } catch (error) {
      console.error(`Error deleting movie ${id}:`, error);
      throw error;
    }
  },

  searchMovies: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`, {
        params: {
          title_like: query
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  getMoviesByGenre: async (genre) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`, {
        params: {
          genre_like: genre
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching movies by genre ${genre}:`, error);
      throw error;
    }
  },

  getTopRatedMovies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`, {
        params: {
          _sort: 'rating',
          _order: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  getMoviesPaginated: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`, {
        params: {
          _page: page,
          _limit: limit
        }
      });
      return {
        movies: response.data,
        totalCount: response.headers['x-total-count']
      };
    } catch (error) {
      console.error('Error fetching paginated movies:', error);
      throw error;
    }
  }
};

export default moviesApi;

const exampleUsage = async () => {
  console.log('=== Get All Movies ===');
  const allMovies = await moviesApi.getAllMovies();
  console.log(allMovies);

  console.log('\n=== Get Movie by ID ===');
  const movie = await moviesApi.getMovieById(1);
  console.log(movie);

  console.log('\n=== Add New Movie ===');
  const newMovie = await moviesApi.addMovie({
    title: 'New Movie',
    description: 'A brand new movie',
    genre: 'Action',
    year: 2024,
    rating: 8.0,
    posterUrl: 'https://example.com/poster.jpg'
  });
  console.log(newMovie);

  console.log('\n=== Update Movie ===');
  const updatedMovie = await moviesApi.updateMovie(1, {
    id: 1,
    title: 'Updated Movie',
    description: 'Updated description',
    genre: 'Drama',
    year: 2024,
    rating: 9.0,
    posterUrl: 'https://example.com/poster.jpg'
  });
  console.log(updatedMovie);

  console.log('\n=== Partial Update Movie ===');
  const partiallyUpdated = await moviesApi.partialUpdateMovie(1, {
    rating: 9.5
  });
  console.log(partiallyUpdated);

  console.log('\n=== Search Movies ===');
  const searchResults = await moviesApi.searchMovies('Dark');
  console.log(searchResults);

  console.log('\n=== Get Movies by Genre ===');
  const actionMovies = await moviesApi.getMoviesByGenre('Action');
  console.log(actionMovies);

  console.log('\n=== Get Top Rated Movies ===');
  const topRated = await moviesApi.getTopRatedMovies();
  console.log(topRated);

  console.log('\n=== Get Paginated Movies ===');
  const paginated = await moviesApi.getMoviesPaginated(1, 5);
  console.log(paginated);

  console.log('\n=== Delete Movie ===');
  const deleteResult = await moviesApi.deleteMovie(newMovie.id);
  console.log(deleteResult);
};
