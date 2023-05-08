// Lấy chi tiết một phim dựa trên ID:
// router.get('/', function(req, res) {
//     res.render('');
//   });
const express = require('express');
const app = express();
const router = express.Router();
const Movie = require('../models/movie');

router.get('/:id', async (req, res) => {
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
