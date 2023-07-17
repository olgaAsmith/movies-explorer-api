const Movie = require('../models/movies');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const ValidateError = require('../errors/ValidateError');

const createMovie = (req, res, next) => {
  const { ...values } = req.body;
  const owner = req.user._id;
  const newMovie = { ...values, owner };
  Movie.create(newMovie)
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new NotFound('Данные не найдены'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movie.deleteOne()
          .then(() => res.status(200).send({
            message: 'Карточка фильма успешна удалена',
          }));
      }
      return next(new Forbidden('Нельзя удалить чужие карточки фильмов'));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidateError('Введены некорректные данные'));
      } else {
        next(error);
      }
    });
};

const getMoviesList = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => new NotFound('У данного владельца отсутсвуют сохраненные карточки фильмов'))
    .then((moviesList) => {
      res.status(200).send(moviesList);
    })
    .catch(next);
};

module.exports = {
  createMovie, deleteMovie, getMoviesList,
};
