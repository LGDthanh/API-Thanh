const express = require('express');
const app = express();
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', function(req, res) {
  res.render('movies');
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.send('Movie deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;