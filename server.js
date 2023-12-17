const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3001;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Sequelize configuration
const sequelize = new Sequelize('netflix', 'exampleuser', 'examplepass', {
  host: 'localhost',
  dialect: 'postgres',
});

// Définir un modèle Movie
const Movie = sequelize.define('Movie', {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  movie_name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'movie_name',
  },
  movie_year: {
    type: DataTypes.INTEGER,
    field: 'movie_year',
  },
}, {
  tableName: 'movies',
  timestamps: false,
});

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exemple avant la requête Sequelize
// Exemple avant la requête Sequelize
app.get('/api/movies', async (req, res) => {
  try {
    console.log('Fetching movies...');
    const movies = await Movie.findAll({
      attributes: [
        ['id', 'movie_id'],
        'movie_name',
        'movie_year',
      ],
    });
    console.log('Number of movies:', movies.length);
    console.log('Movies:', movies);
    res.json(movies);
  } catch (error) {
    console.error('Error querying the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Internal Server Error: ${err.message}`);
});

// Exemple après la synchronisation Sequelize
async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing with the database', error);
  }
}

// Call the function to sync the database
syncDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});