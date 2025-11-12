const router = require('express').Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/me/favorites', usersController.getFavorites);
router.post('/me/favorites', usersController.addFavorite);
router.delete('/me/favorites/:eventId', usersController.removeFavorite);

module.exports = router;
