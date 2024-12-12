const Profile = require('../models/Profile');

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve profiles' });
  }
};

// Add a new profile
exports.addProfile = async (req, res) => {
  try {
    const { name, photo, description, address } = req.body;
    
    const newProfile = new Profile({ name, photo, description, address });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add profile' });
  }
};

// Update an existing profile
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, photo, description, address } = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(id, { name, photo, description, address }, { new: true });
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete profile' });
  }
};
