import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("User's current bio here");
  const [bioInput, setBioInput] = useState(bio);
  const [profileImage, setProfileImage] = useState("profile-picture-url");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewUrl] = useState(null);

  const _id = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/profile/${_id}`);
        setBio(response.data.bioInput);
        setProfileImage(response.data.imageUrl);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProfileData();
  },[_id]);

  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', newImage);
      formData.append('upload_preset', 'Shop_Nest');

      const response = await axios.post('https://api.cloudinary.com/v1_1/dblgnnd2d/image/upload',formData);
      console.log(response);

      const imageUrl = response.data.secure_url;
      console.log(imageUrl)
      setProfileImage(imageUrl);
      console.log(imageUrl)
      setBio(bioInput);

      const description = {
        imageUrl,
        _id,
        bioInput
      }

      const message = await fetch('http://localhost:5000/api/auth/description', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(description)
      });
      setPreviewUrl(null);
      setIsEditing(false);
      alert("Profile updated successfully.")
    } catch (error) {
      console.log(error);
    }
    setBio(bioInput);
  };


  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className='image-div'>
          <img src={profileImage} alt="Profile Image" className="profile-pic" />
          <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
        <h1 className="username">R.J Shoukath</h1>
        <p className="user-bio">{bio || "Add a short bio about yourself"}</p>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <h2>Total Questions Solved</h2>
          <p className="stat-value">500</p>
        </div>
        <div className="stat-card">
          <h2>Total Battles Played</h2>
          <p className="stat-value">120</p>
          <p className="stat-percentage">Winning Rate: <span className="win-percentage">75%</span></p>
          <div className="progress-bar">
            <div className="progress-fill win-progress"></div>
          </div>
        </div>
        <div className="stat-card">
          <h2>Battles Won</h2>
          <p className="stat-value">90</p>
          <div className="progress-bar">
            <div className="progress-fill won-progress" style={{ width: "75%" }}></div>
          </div>
        </div>
        <div className="stat-card">
          <h2>Battles Lost</h2>
          <p className="stat-value">30</p>
          <div className="progress-bar">
            <div className="progress-fill lost-progress" style={{ width: "25%" }}></div>
          </div>
        </div>
      </section>

      <section className="achievement-section">
        <h2>Achievements</h2>
        <ul className="achievements">
          <li>100-Day Streak</li>
          <li>Top Coder in Battles</li>
          <li>Consistent Practice Award</li>
          {/* <!-- Add more achievements --> */}
        </ul>
      </section>

      <section className="activity-feed">
        <h2>Recent Activity</h2>
        <ul>
          <li>Attempted a hard-level challenge - 2 days ago</li>
          <li>Won a battle against User123 - 3 days ago</li>
          {/* <!-- Add more recent activities --> */}
        </ul>
      </section>

      {isEditing && (
        <div className="edit-profile-modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSaveChanges}>
              <label>
                Profile Image:
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>
              {previewImage && (
                <div>
                  <img
                    src={previewImage}
                    alt="Image Preview"
                    className="image-preview"
                    style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "10px" }}
                  />
                </div>
              )}
              <label>
                Bio:
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  placeholder="Write a short bio about yourself"
                />
              </label>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>


  )
}

export default Profile