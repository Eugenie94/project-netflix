import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Card, CardContent } from '@mui/material';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/movies');
        setMovies(response.data);
      } catch (err) {
        setError(`Une erreur s'est produite lors de la récupération des films. Erreur: ${err.message}`);
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      {error && <p>{error}</p>}

      <AppBar position="static" className="banner">
        <Toolbar>
          <Typography variant="h6">NETFLIX</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <div className="movies-container">
          {movies.map((movie) => (
            <Card key={movie.id} className="movie-card">
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className='titreNetflix'>
                  {movie.movie_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className='dateNetflix2'>
                  Année de sortie: {movie.movie_year}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default App;