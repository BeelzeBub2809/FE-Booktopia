import { useState, useEffect } from 'react'; 
import Lottie from "react-lottie";
import Swal from 'sweetalert2';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json";

export default function EditUserModal({ showModal, handleCloseModal, user }) {
  const [loading, setLoading] = useState(true);
  const [profileImagePreview, setProfileImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
  const [roles, setRoles] = useState([]); // Ensure roles is initialized as an empty array
  const [selectedUser, setSelectedUser] = useState({
    _id: '',
    userName: '',
    email: '',
    roleId: [], // Initialize as an empty array
    image: '',
    address: '',
    phone: '',
    gender: '',
    fullName: '',
  });

  const loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/role");
        const data = await response.json();
        setRoles(data.data || []); // Correct path to access roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(`http://localhost:9999/api/user/${user._id}`);
          const data = await response.json();
          const userData = data.data; // Assuming the user data is in data.data
          setProfileImagePreview(userData.image || profileImagePreview);
          setSelectedUser({
            _id: userData._id,
            userName: userData.userName,
            email: userData.email,
            roleId: userData.roleId || [], // Ensure this is initialized correctly
            image: userData.image,
            address: userData.address,
            phone: userData.phone,
            gender: userData.gender,
            fullName: userData.fullName,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchRoles();
    fetchUserData();
  }, [user]);

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    const selectedRoles = [...selectedUser.roleId]; // Create a copy to avoid mutating state

    if (checked) {
      selectedRoles.push(value);
    } else {
      const index = selectedRoles.indexOf(value);
      if (index > -1) {
        selectedRoles.splice(index, 1);
      }
    }
    setSelectedUser({ ...selectedUser, roleId: selectedRoles });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setSelectedUser(prevUser => ({ ...prevUser, image: reader.result.split(",")[1] })); // If needed, change based on your API
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:9999/api/user/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser), // Sending the updated user data
      });
  
      if (!res.ok) {
        throw new Error('Failed to update user'); // Handle any error response
      }
  
      const data = await res.json(); // Assuming the response contains a JSON object
      Swal.fire({
        title: 'Successfully Updated',
        text: data.message, // Adjust based on the actual response structure
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        handleCloseModal();
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      }).then(() => {
        handleCloseModal();
      });
    }
  };
  

  if (loading) {
    return <Lottie options={loadingObj} height={400} width={400} />;
  }

  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'flex', alignItems: 'flex-end', minHeight: '70vh' }} role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <div className="d-flex flex-column align-items-center" style={{ width: '40%' }}>
                      <img src={profileImagePreview} alt="Profile" className="avatar" style={{ width: '60%' }} />
                      <div className="mt-3">
                        <label className="form-label">Upload Profile Image</label>
                        <input type="file" className="form-control" accept="image/png, image/jpeg" onChange={handleImageChange} />
                      </div>
                    </div>

                    <form className="w-100">
                      <div className="form-group mb-3">
                        <label>Full Name</label>
                        <input type="text" className="form-control" name="fullName" value={selectedUser.fullName} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={selectedUser.email} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3">
                        <label>Phone</label>
                        <input type="text" className="form-control" name="phone" value={selectedUser.phone} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3">
                        <label>Address</label>
                        <input type="text" className="form-control" name="address" value={selectedUser.address} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3">
                        <label>Gender</label>
                        <input type="text" className="form-control" name="gender" value={selectedUser.gender} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3">
                        <label>Roles</label>
                        {roles.length > 0 && roles.map(role => (
                          <div key={role._id} className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value={role._id}
                              checked={selectedUser.roleId.includes(role._id)}
                              onChange={handleRoleChange}
                            />
                            <label className="form-check-label">{role.role}</label> 
                          </div>
                        ))}
                      </div>                    
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                  <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
