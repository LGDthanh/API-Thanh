const express = require('express');
const app = express();
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200)
    res.render('movies',{ movies: movies});
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
