const express = require('express');
const router = express.Router();
const arrayController = require('../controllers/arrayController');

router.post('/clear-array', arrayController.clearArray);

module.exports = router;