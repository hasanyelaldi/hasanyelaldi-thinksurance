const router = require('express').Router();
const personController = require('../controllers/personController');

router.get('/get-all', personController.getAll);

module.exports = router;