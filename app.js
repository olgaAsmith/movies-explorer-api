require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const cors = require('./middlewares/cors');
const errorType = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const { NODE_ENV, URL_DB_SERVER } = process.env;

const app = express();
mongoose.connect(NODE_ENV !== 'production' ? 'mongodb://localhost:27017/filmsdb' : URL_DB_SERVER, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.use(express.json());

app.use(router);
app.use('/*', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorType);
app.listen(3000);
