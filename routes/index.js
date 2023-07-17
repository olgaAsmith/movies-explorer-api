const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const { authorize } = require('../middlewares/auth');
const {
  createUser, login, logout,
} = require('../controllers/users');
const celebrate = require('../middlewares/celebrate');

router.post('/signup', celebrate.userSignUp, createUser);
router.post('/signin', celebrate.userSignIn, login);
router.get('/signout', logout);
router.use(authorize);
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
