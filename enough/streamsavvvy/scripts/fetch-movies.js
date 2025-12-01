import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const fetchMoviesFromTMDB = async () => {
  try {
    console.log('Fetching popular movies from TMDB...');

    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    const movies = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview || 'No description available',
      genre: movie.genre_ids.join(', '),
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
      rating: movie.vote_average || 0,
      posterUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null
    }));

    const db = {
      movies: movies
    };

    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    console.log(`Successfully fetched ${movies.length} movies and saved to db.json`);

  } catch (error) {
    console.error('Error fetching movies:', error.message);
    process.exit(1);
  }
};

fetchMoviesFromTMDB();
