import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admindashboard.css'
const Admindashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [editProfileId, setEditProfileId] = useState(null);

  useEffect(() => {
    // Fetch profiles from the backend
    const fetchProfiles = async () => {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/admin/profiles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(response.data);
    };

    fetchProfiles();
  }, []);

  const handleAddProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/admin/profiles',
        { name, photo, description, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfiles([...profiles, response.data]);
      resetForm();
    } catch (err) {
      console.error('Failed to add profile', err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `http://localhost:5000/api/admin/profiles/${editProfileId}`,
        { name, photo, description, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfiles(profiles.map(profile => (profile._id === editProfileId ? response.data : profile)));
      resetForm();
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  const handleDeleteProfile = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/admin/profiles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(profiles.filter(profile => profile._id !== id));
    } catch (err) {
      console.error('Failed to delete profile', err);
    }
  };

  const resetForm = () => {
    setName('');
    setPhoto('');
    setDescription('');
    setAddress('');
    setEditProfileId(null);
  };

  return (
    <div>
      <h2>Manage Profiles</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {editProfileId ? (
          <button onClick={handleUpdateProfile}>Update Profile</button>
        ) : (
          <button onClick={handleAddProfile}>Add Profile</button>
        )}
        <button onClick={resetForm}>Reset</button>
      </div>

      <h3>Profile List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Description</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile._id}>
              <td>{profile.name}</td>
              <td><img src={profile.photo} alt={profile.name} width="50" /></td>
              <td>{profile.description}</td>
              <td>{profile.address}</td>
              <td>
                <button onClick={() => { setName(profile.name); setPhoto(profile.photo); setDescription(profile.description); setAddress(profile.address); setEditProfileId(profile._id); }}>Edit</button>
                <button onClick={() => handleDeleteProfile(profile._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admindashboard;
