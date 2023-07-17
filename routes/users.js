const router = require('express').Router();
const {
  updateUserinfo, getUserMe,
} = require('../controllers/users');
const celebrate = require('../middlewares/celebrate');

router.get('/me', getUserMe);
router.patch('/me', celebrate.userUpdateInfo, updateUserinfo);

module.exports = router;
