import { event } from 'jquery';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';

export default function UserProfileModal({ showModal, handleCloseModal, user }) {
  const [imagePreview, setImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
  console.log(user);
  
  const userAddress = user.address ? user.address.split(", ") : [];
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [address, setAddress] = useState(userAddress[0] || '');
  

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    fullName: user?.fullName || '',
    DOB: user?.DOB || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || ''
  });
  




  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data.map(province => ({ value: province.code, label: province.name })))
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      try {
        fetch(`https://provinces.open-api.vn/api/p/${selectedProvince.value}?depth=2`)
          .then((response) => response.json())
          .then((data) => setDistricts(data.districts.map(district => ({ value: district.code, label: district.name }))));
        setSelectedDistrict(null); // Clear district and ward when province changes
        setSelectedWard(null);
        setWards([]);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      try {
        fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.value}?depth=2`)
          .then((response) => response.json())
          .then((data) => setWards(data.wards.map(ward => ({ value: ward.code, label: ward.name }))));
        setSelectedWard(null); // Clear ward when district changes
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
  }, [selectedDistrict]);



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
      const formSubmit = {
        ...formData,
        address: `${address}, ${selectedWard.label}, ${selectedDistrict.label}, ${selectedProvince.label}`,
      }
      const response = await fetch(`http://localhost:9999/api/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formSubmit)
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
                        <label>Province</label>
                        <Select
                          value={selectedProvince}
                          placeholder={userAddress[3] || "Select Province"}
                          onChange={setSelectedProvince}
                          options={provinces}
                        />
                      </div>

                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>District</label>
                        <Select
                          value={selectedDistrict}
                          onChange={setSelectedDistrict}
                          options={districts}
                          placeholder={userAddress[2] || "Select District"}
                          isDisabled={!selectedProvince} // Disable if province is not selected
                        />
                      </div>

                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Ward</label>
                        <Select
                          value={selectedWard}
                          onChange={setSelectedWard}
                          options={wards}
                          placeholder={userAddress[1] || "Select Ward"}
                          isDisabled={!selectedDistrict} // Disable if district is not selected
                        />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Detail address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
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
