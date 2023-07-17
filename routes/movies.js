const router = require('express').Router();
const {
  createMovie, deleteMovie, getMoviesList,
} = require('../controllers/movies');
const celebrate = require('../middlewares/celebrate');

router.post('/', celebrate.movieInfo, createMovie);
router.delete('/:id', celebrate.movieID, deleteMovie);
router.get('/', getMoviesList);

module.exports = router;
