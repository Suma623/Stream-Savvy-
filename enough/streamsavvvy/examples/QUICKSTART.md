# JSON Server Quick Start

## 1. Start JSON Server

Open a terminal and run:

```bash
npm run json-server
```

You should see:
```
JSON Server started on PORT :3001
http://localhost:3001
```

## 2. Test the API

Open a new terminal and test with curl:

```bash
curl http://localhost:3001/movies
```

You should see a JSON array of 5 movies.

## 3. Open the Example Frontend

Open `examples/frontend-example.html` in your web browser:

```bash
open examples/frontend-example.html
```

Or simply double-click the file.

You should see a grid of movies. Click on any movie to see its details.

## 4. Fetch Real Movies from TMDB

To populate db.json with real movies from TMDB:

```bash
npm run fetch-movies
```

This will fetch 20 popular movies and save them to db.json.

## 5. Manually Edit Movies

Open `db.json` in your text editor and add a new movie:

```json
{
  "movies": [
    {
      "id": 6,
      "title": "My Custom Movie",
      "description": "This is my custom movie",
      "genre": "Sci-Fi",
      "year": 2024,
      "rating": 8.5,
      "posterUrl": "https://via.placeholder.com/500x750?text=My+Movie"
    }
  ]
}
```

Save the file and refresh your browser. The new movie should appear!

## 6. Test CRUD Operations

### Get all movies
```bash
curl http://localhost:3001/movies
```

### Get single movie
```bash
curl http://localhost:3001/movies/1
```

### Add a movie
```bash
curl -X POST http://localhost:3001/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Movie",
    "description": "This is a test",
    "genre": "Drama",
    "year": 2024,
    "rating": 7.5,
    "posterUrl": "https://via.placeholder.com/500x750"
  }'
```

### Update a movie
```bash
curl -X PUT http://localhost:3001/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Updated Title",
    "description": "Updated description",
    "genre": "Action",
    "year": 2024,
    "rating": 9.0,
    "posterUrl": "https://via.placeholder.com/500x750"
  }'
```

### Delete a movie
```bash
curl -X DELETE http://localhost:3001/movies/1
```

## 7. Use in Your React App

Copy the `MoviesList.jsx` component to your React project:

```jsx
import MoviesList from './examples/MoviesList';

function App() {
  return <MoviesList />;
}
```

Or use the axios API helper:

```javascript
import moviesApi from './examples/axios-example';

const movies = await moviesApi.getAllMovies();
const movie = await moviesApi.getMovieById(1);
```

## Common Issues

**Port already in use?**
Change the port in package.json:
```json
"json-server": "json-server db.json --port 3002"
```

**CORS errors?**
JSON Server handles CORS automatically. Make sure the server is running.

**Changes not showing?**
Refresh your browser after editing db.json. JSON Server auto-reloads the file.

## Next Steps

- Read the full documentation in `JSON_SERVER_SETUP.md`
- Check out the axios examples in `examples/axios-example.js`
- Experiment with filtering, sorting, and pagination
- Build your own frontend using the API
