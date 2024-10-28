import { useState } from 'react';

export default function UserProfileModal({ showModal, handleCloseModal, user }) {
  const [imagePreview, setImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    fullName: user?.fullName || '',
    DOB: user?.DOB || '',
    address: user?.address || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || ''
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:9999/api/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Profile updated successfully');
        handleCloseModal();
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile');
    }
  };

  if (!user) {
    return showModal ? <div>Loading user data...</div> : null;
  }

  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            style={{ display: 'flex', minHeight: '160vh', background: 'none', alignItems: 'flex-end' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Profile User</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <div className="d-flex" style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={imagePreview} alt="User" className="avatar" style={{ width: '40%' }} />
                      <div className="mt-3">
                        <label className="form-label text-dark">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/png, image/jpeg"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <form className="w-100">
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Full name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="DOB"
                          value={formData.DOB}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Gender</label>
                        <input
                          type="text"
                          className="form-control"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal} style={{ backgroundColor: "gray" }}>Close</button>
                  <button type="button" className="btn btn-success" style={{ backgroundColor: "green" }} onClick={handleSaveProfile}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
