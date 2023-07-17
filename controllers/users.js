const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Conflict = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashed) => {
      User.create({ ...req.body, password: hashed })
        .then((user) => res.status(201).send(
          {
            name: user.name,
            email: user.email,
          },
        ))
        .catch((error) => {
          if (error.code === 11000) {
            next(new Conflict('Пользователь с такими данными уже существует'));
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret',
      );
      res.cookie('token', token, {
        maxAge: 604800000,
        httpOnly: true,
      });
      res.send({ message: 'Вход выполнен успешно' });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Выход выполнен успешно' });
};

const updateUserinfo = (req, res, next) => {
  const { name, email } = req.body;
  const info = { name, email };
  User.findByIdAndUpdate(req.user._id, info, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ name: user.name, email: user.email }))
    .catch(next);
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ name: user.name, email: user.email }))
    .catch(next);
};
module.exports = {
  createUser, login, logout, updateUserinfo, getUserMe,
};
