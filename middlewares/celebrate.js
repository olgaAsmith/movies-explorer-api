const { celebrate, Joi } = require('celebrate');

const regLink = /https?:\/\/w{0,3}\.?([\w-._~:/?#[\]@!$&'()*+,;=])*\.([\w-._~:/?#[\]@!$&'()*+,;=])/;

const userSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const userSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const userUpdateInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const movieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regLink),
    trailerLink: Joi.string().required().regex(regLink),
    thumbnail: Joi.string().required().regex(regLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieID = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  userSignUp, userSignIn, userUpdateInfo, movieInfo, movieID,
};
