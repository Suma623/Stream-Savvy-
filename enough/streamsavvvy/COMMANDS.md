# JSON Server Commands

## Installation (Already Done)
```bash
npm install --save-dev json-server node-fetch dotenv
```

## Start JSON Server
```bash
npm run json-server
```

Server will run at: http://localhost:3001

## Fetch Movies from TMDB
```bash
npm run fetch-movies
```

This fetches popular movies from TMDB and saves them to db.json

## Test API Endpoints

### Get all movies
```bash
curl http://localhost:3001/movies
```

### Get movie by ID
```bash
curl http://localhost:3001/movies/1
```

### Add a new movie
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

### Update a movie (full)
```bash
curl -X PUT http://localhost:3001/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Updated Movie",
    "description": "Updated description",
    "genre": "Drama",
    "year": 2024,
    "rating": 9.0,
    "posterUrl": "https://example.com/poster.jpg"
  }'
```

### Update a movie (partial)
```bash
curl -X PATCH http://localhost:3001/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"rating": 9.5}'
```

### Delete a movie
```bash
curl -X DELETE http://localhost:3001/movies/1
```

## Advanced Queries

### Filter by genre
```bash
curl "http://localhost:3001/movies?genre_like=Action"
```

### Sort by rating (descending)
```bash
curl "http://localhost:3001/movies?_sort=rating&_order=desc"
```

### Pagination
```bash
curl "http://localhost:3001/movies?_page=1&_limit=5"
```

### Search by title
```bash
curl "http://localhost:3001/movies?title_like=Dark"
```

### Multiple filters
```bash
curl "http://localhost:3001/movies?year=2024&rating_gte=8"
```

## Run Both Servers

**Terminal 1 - React App:**
```bash
npm run dev
```

**Terminal 2 - JSON Server:**
```bash
npm run json-server
```

## Open Examples

**Vanilla JS Example:**
```bash
open examples/frontend-example.html
```

**Read Quick Start:**
```bash
cat examples/QUICKSTART.md
```

**Read Full Documentation:**
```bash
cat JSON_SERVER_SETUP.md
```
