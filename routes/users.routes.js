const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// Admin-only (we’ll enforce role later)
router.post('/support-rep', usersController.createSupportRep);
router.get('/support-reps', usersController.getSupportReps);

module.exports = router;
