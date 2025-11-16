# 🎬 StreamSavvy - Movie Streaming Platform

A modern, cinematic movie streaming website frontend built with React, featuring real-time movie data from TMDB API.

## 🚀 Quick Start

### 1. Get Your TMDB API Key

1. Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to **Settings → API** 
4. Request an API Key (v3 auth)
5. Copy your API key

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_KEY=your_tmdb_api_key_here
```

**Important:** Replace `your_tmdb_api_key_here` with your actual TMDB API key.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or the next available port).

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## ✨ Features

- 🎥 Browse trending, popular, top-rated, and upcoming movies
- 🔍 Search movies and TV shows
- 🎭 Filter by genres
- ❤️ Add/remove movies to watchlist (localStorage)
- 📱 Fully responsive design
- 🌙 Dark/Light theme toggle
- 🎬 Movie details with trailers, cast, and recommendations
- ⚡ Smooth animations with Framer Motion

## 🛠️ Tech Stack

- React 19
- React Router DOM
- Framer Motion
- React Icons
- Vite
- TMDB API

## 📝 Notes

- The watchlist is stored in browser localStorage
- All movie data is fetched from TMDB API
- No backend required - fully frontend application

---

**Powered by [The Movie Database (TMDB)](https://www.themoviedb.org/)**
