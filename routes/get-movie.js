const express = require('express');
const app = express();
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', function(req, res) {
  res.render('list-movies');
});

app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// Lấy chi tiết một phim dựa trên ID:
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
