const router = require('express').Router();
const eventController = require('../controllers/eventsController');
const auth = require('../middleware/auth');

router.get('/', eventController.list);
router.get('/:eventId', eventController.detail);
router.post('/upsert-many', auth, eventController.upsertMany);

module.exports = router;
