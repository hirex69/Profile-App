const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all profiles
router.get('/profiles', authMiddleware, profileController.getAllProfiles);

// Route to add a new profile
router.post('/profiles', authMiddleware, profileController.addProfile);

// Route to update a profile
router.put('/profiles/:id', authMiddleware, profileController.updateProfile);

// Route to delete a profile
router.delete('/profiles/:id', authMiddleware, profileController.deleteProfile);

module.exports = router;
