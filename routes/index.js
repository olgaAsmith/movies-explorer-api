const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const { authorize } = require('../middlewares/auth');
const {
  createUser, login, logout,
} = require('../controllers/users');
const celebrate = require('../middlewares/celebrate');
const NotFound = require('../errors/NotFound');

router.post('/signup', celebrate.userSignUp, createUser);
router.post('/signin', celebrate.userSignIn, login);
router.use(authorize);
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);
router.get('/signout', logout);
router.use('/*', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});
module.exports = router;
