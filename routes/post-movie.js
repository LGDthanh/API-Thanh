const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', function(req, res) {
  res.render('api/movies/post');
});

router.post('/', function(req, res) {
  const { title, director, year } = req.body;

  const newMovie = new Movie({
    title: title,
    director: director,
    year: year
  });

  newMovie.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Lỗi trong khi thêm phim!');
    } else {
      res.status(200).send('Phim đã được thêm vào cơ sở dữ liệu.');
    }
  });
});


// //Cập nhật thông tin một phim dựa trên ID:

// router.put('/movies/:id', async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!movie) {
//       return res.status(404).send('Movie not found');
//     }
//     res.json(movie);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });
module.exports = router;
