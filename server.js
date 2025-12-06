const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files
app.use(express.static('public'));

// Mock movie database (in real app, would be from DB)
const moviesDB = [
  {
    id: 1,
    title: 'The Matrix',
    year: 1999,
    genre: 'Sci-Fi, Action',
    rating: 8.7,
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
    thumbnail: 'https://via.placeholder.com/300x450?text=The+Matrix',
    videoUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8',
    duration: '136 min'
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi, Thriller',
    rating: 8.8,
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    thumbnail: 'https://via.placeholder.com/300x450?text=Inception',
    videoUrl: 'https://www.youtube.com/embed/YoHD_XwstrQ',
    duration: '148 min'
  },
  {
    id: 3,
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi, Drama',
    rating: 8.6,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    thumbnail: 'https://via.placeholder.com/300x450?text=Interstellar',
    videoUrl: 'https://www.youtube.com/embed/zSID6AWvubE',
    duration: '169 min'
  },
  {
    id: 4,
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action, Crime',
    rating: 9.0,
    description: 'Batman must accept one of the greatest psychological tests to fight injustice.',
    thumbnail: 'https://via.placeholder.com/300x450?text=The+Dark+Knight',
    videoUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    duration: '152 min'
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    year: 1994,
    genre: 'Crime, Drama',
    rating: 8.9,
    description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife intertwine in four tales of violence and redemption.',
    thumbnail: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
    videoUrl: 'https://www.youtube.com/embed/s7EdQ4FqJgs',
    duration: '154 min'
  },
  {
    id: 6,
    title: 'Forrest Gump',
    year: 1994,
    genre: 'Drama, Comedy',
    rating: 8.8,
    description: 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.',
    thumbnail: 'https://via.placeholder.com/300x450?text=Forrest+Gump',
    videoUrl: 'https://www.youtube.com/embed/bLvqoHBptjg',
    duration: '142 min'
  }
];

// API endpoints
app.get('/api/movies', (req, res) => {
  res.json(moviesDB);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = moviesDB.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

// Search movies
app.get('/api/search', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = moviesDB.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.genre.toLowerCase().includes(q) ||
    m.description.toLowerCase().includes(q)
  );
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`🎬 Movie server running on http://localhost:${PORT}`);
});
