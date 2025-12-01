# JSON Server Setup Guide

This guide explains how to set up and use JSON Server as a fake backend for your movie application.

## Installation

JSON Server is already installed as a dev dependency. If you need to install it manually:

```bash
npm install --save-dev json-server
```

## Database Structure

The `db.json` file contains your movie data with the following structure:

```json
{
  "movies": [
    {
      "id": 1,
      "title": "Movie Title",
      "description": "Movie description",
      "genre": "Action, Drama",
      "year": 2024,
      "rating": 8.5,
      "posterUrl": "https://example.com/poster.jpg"
    }
  ]
}
```

## Fetching Movies from TMDB API

To populate your `db.json` file with real movie data from TMDB:

1. Make sure your `.env` file has the TMDB API key:
   ```
   VITE_TMDB_KEY=your_tmdb_api_key_here
   ```

2. Run the fetch script:
   ```bash
   npm run fetch-movies
   ```

This will fetch popular movies from TMDB and save them to `db.json`.

## Running JSON Server

Start the JSON Server on port 3001:

```bash
npm run json-server
```

The server will be available at: `http://localhost:3001`

## Available Endpoints

Once JSON Server is running, you can use these endpoints:

### GET /movies
Get all movies

```bash
curl http://localhost:3001/movies
```

### GET /movies/:id
Get a single movie by ID

```bash
curl http://localhost:3001/movies/1
```

### POST /movies
Add a new movie

```bash
curl -X POST http://localhost:3001/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Movie",
    "description": "A great movie",
    "genre": "Action",
    "year": 2024,
    "rating": 8.0,
    "posterUrl": "https://example.com/poster.jpg"
  }'
```

### PUT /movies/:id
Update an existing movie

```bash
curl -X PUT http://localhost:3001/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Updated Movie Title",
    "description": "Updated description",
    "genre": "Action, Drama",
    "year": 2024,
    "rating": 9.0,
    "posterUrl": "https://example.com/poster.jpg"
  }'
```

### PATCH /movies/:id
Partially update a movie

```bash
curl -X PATCH http://localhost:3001/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"rating": 9.5}'
```

### DELETE /movies/:id
Delete a movie

```bash
curl -X DELETE http://localhost:3001/movies/1
```

## Manually Editing Movies

To add or edit movies manually:

1. Open the `db.json` file in your text editor
2. Add or modify movie entries in the `movies` array
3. Save the file
4. JSON Server will automatically reload the data

Example entry:
```json
{
  "id": 6,
  "title": "My Custom Movie",
  "description": "This is a custom movie I added",
  "genre": "Thriller",
  "year": 2024,
  "rating": 7.5,
  "posterUrl": "https://example.com/custom-poster.jpg"
}
```

## Frontend Examples

### Using Vanilla JavaScript (Fetch API)

See `examples/frontend-example.html` for a complete working example.

Open the file in your browser after starting JSON Server:
```bash
open examples/frontend-example.html
```

### Using React

See `examples/MoviesList.jsx` for a React component example.

To use in your React app:

```jsx
import MoviesList from './examples/MoviesList';

function App() {
  return <MoviesList />;
}
```

### Simple Fetch Examples

#### Get All Movies
```javascript
const response = await fetch('http://localhost:3001/movies');
const movies = await response.json();
console.log(movies);
```

#### Get Single Movie
```javascript
const response = await fetch('http://localhost:3001/movies/1');
const movie = await response.json();
console.log(movie);
```

#### Add a Movie
```javascript
const response = await fetch('http://localhost:3001/movies', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Movie',
    description: 'A great movie',
    genre: 'Action',
    year: 2024,
    rating: 8.0,
    posterUrl: 'https://example.com/poster.jpg'
  })
});
const newMovie = await response.json();
console.log(newMovie);
```

#### Update a Movie
```javascript
const response = await fetch('http://localhost:3001/movies/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 1,
    title: 'Updated Movie',
    description: 'Updated description',
    genre: 'Drama',
    year: 2024,
    rating: 9.0,
    posterUrl: 'https://example.com/poster.jpg'
  })
});
const updatedMovie = await response.json();
console.log(updatedMovie);
```

#### Delete a Movie
```javascript
const response = await fetch('http://localhost:3001/movies/1', {
  method: 'DELETE'
});
console.log('Movie deleted');
```

## Advanced JSON Server Features

### Filtering
Get movies by genre:
```bash
http://localhost:3001/movies?genre=Action
```

### Sorting
Sort by rating (descending):
```bash
http://localhost:3001/movies?_sort=rating&_order=desc
```

### Pagination
Get 10 movies per page, page 1:
```bash
http://localhost:3001/movies?_page=1&_limit=10
```

### Search
Search in title:
```bash
http://localhost:3001/movies?title_like=Dark
```

### Range
Get movies with rating between 8 and 10:
```bash
http://localhost:3001/movies?rating_gte=8&rating_lte=10
```

## Running Both Servers

To run your React app and JSON Server simultaneously, open two terminals:

**Terminal 1 - React App:**
```bash
npm run dev
```

**Terminal 2 - JSON Server:**
```bash
npm run json-server
```

Your React app will be on `http://localhost:5173` and JSON Server on `http://localhost:3001`.

## Troubleshooting

### CORS Issues
JSON Server automatically handles CORS, so you shouldn't have issues making requests from your frontend.

### Port Already in Use
If port 3001 is in use, change it in package.json:
```json
"json-server": "json-server db.json --port 3002"
```

### Database Not Updating
Make sure to save `db.json` after making manual edits. JSON Server watches the file for changes.

## Notes

- JSON Server is for development only, not production
- Data is stored in `db.json` and persists between restarts
- The server automatically creates IDs for new entries
- Full REST API compliance with standard HTTP methods
