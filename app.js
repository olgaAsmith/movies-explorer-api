require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const cors = require('./middlewares/cors');
const errorType = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { LOCAL_DB_SERVER } = require('./utils/config');

const { NODE_ENV, URL_DB_SERVER } = process.env;

const app = express();
mongoose.connect(NODE_ENV !== 'production' ? LOCAL_DB_SERVER : URL_DB_SERVER, {
  useNewUrlParser: true,
});
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorType);
app.listen(3000);
