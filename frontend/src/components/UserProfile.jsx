import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import EditProfile from './EditProfile';
import '../styles/UserProfile.css'; // Import the CSS file

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isEditing) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not found in localStorage');
          }

          const response = await fetch('https://eduxcel-back.onrender.com/api/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Error fetching user profile: ${response.status}`);
          }

          const data = await response.json();
          setUserProfile(data);
          setLoading(false);
          setError(null);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [isEditing]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = async (updatedProfileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://eduxcel-back.onrender.com/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedProfileData,
      });

      if (!response.ok) {
        throw new Error(`Error updating user profile: ${response.status}`);
      }

      const updatedProfile = await response.json();
      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError(error.message);
    }
  };

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && userProfile && (
        <div className="profile-info">
          <div className="profile-image-container">
            <motion.img
              src={`https://eduxcel-back.onrender.com/${userProfile.profileImage}`}
              alt="Profile"
              className="profile-image"
              whileHover={{ scale: 1.1 }} // Framer Motion animation on hover
            />
          </div>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Bio: {userProfile.bio}</p>
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      )}
      {isEditing && (
        <EditProfile
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default UserProfile;
