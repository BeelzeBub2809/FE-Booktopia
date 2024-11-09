import { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';

export default function AddUserModal({ showModal, handleCloseModal }) {
  const [roles, setRoles] = useState([]); // State to hold roles
  const [user, setUser] = useState({
    userName: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    role: '', // Initialize role as an empty string to hold roleId
  });

  useEffect(() => {
    // Fetch roles from the API
    fetch("http://localhost:9999/api/role")
      .then(response => response.json())
      .then(data => {
        setRoles(data.data || []); 
      })
      .catch(error => console.error("Error fetching roles:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:9999/api/user/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: 'Success',
          text: result.message,
          icon: 'success',
          allowOutsideClick: false,
          confirmButtonText: 'Ok',
        }).then(() => {
          handleCloseModal();
        });
      } else {
        throw new Error(result.message || 'Error signing up');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  console.log(user);

  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'flex', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
            <div className="modal-dialog modal-lg modal-dialog-centered" style={{ width: '50vh'}} role='document'>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add User</h5>
                </div>
                <div className="modal-body">
                  <div className="form-group mb-3">
                    <label>User Name</label>
                    <input type="text" className="form-control" name="userName" value={user.userName} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input type="text" className="form-control" name="fullName" value={user.fullName} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Phone</label>
                    <input type="tel" className="form-control" name="phone" value={user.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Address</label>
                    <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Role</label>
                    <select className="form-control" name="role" value={user.role} onChange={handleChange}>
                      <option value="">Select role</option>
                      {roles.map(role => (
                        <option key={role._id} value={role.role}>{role.role}</option> // Passing role._id as the value
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                  <button type="button" className="btn btn-success" onClick={handleSubmit}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
