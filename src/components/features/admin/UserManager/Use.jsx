import React, { useEffect, useRef, useState } from 'react';
import './User.css';
import { DataTable } from 'simple-datatables';
import EditUserModal from './Model/EditUser';
import AddUserModal from './Model/AddUser';
import LoadingLottie from '../../../../Assets/Lottie/loading-0.json';
import Lottie from 'react-lottie';
import Swal from 'sweetalert2';

function UserInfo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const tableRef = useRef(null);
  const datatableRef = useRef(null);
  const isDataTableInitialized = useRef(false);

  const loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9999/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching user information:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    try {
      const response = await fetch(`http://localhost:9999/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setData(prevData =>
        prevData.map(user =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `User status changed to ${newStatus}`,
      });

    } catch (error) {
      console.error('Error updating user status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to change user status.',
      });
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchUsers();
    
    return () => {
      if (datatableRef.current) {
        datatableRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (data.length > 0 && !loading) {
      if (!isDataTableInitialized.current) {
        if (datatableRef.current) {
          datatableRef.current.destroy();
        }

        datatableRef.current = new DataTable(tableRef.current, {
          perPageSelect: [10, 15, ['All', -1]],
          searchable: true,
          paging: true,
          perPage: 10,
        });

        // Add click event listener
        tableRef.current.addEventListener('click', (event) => {
          const target = event.target;
          const row = target.closest('tr');
          if (!row) return;
          
          const userId = row.getAttribute('data-user-id');
          const user = data.find(u => u._id === userId);
          
          if (!user) return;

          // Handle Edit button click
          if (target.classList.contains('btn-warning')) {
            handleEdit(user);
          }
          // Handle Status button click
          else if (target.classList.contains('btn-success') || target.classList.contains('btn-danger')) {
            toggleUserStatus(userId, user.status);
          }
        });

        isDataTableInitialized.current = true;
      }
    }
  }, [data, loading]);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h2>User Information</h2>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={openAddUserModal}>Add User</button>
                {loading ? (
                  <Lottie options={loadingObj} height={100} width={100} />
                ) : (
                  <table ref={tableRef} className="table datatable">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user) => (
                        <tr key={user._id} data-user-id={user._id}>
                          <td>{user.userName}</td>
                          <td>{user.fullName}</td>
                          <td>{user.DOB ? new Date(user.DOB).toLocaleDateString() : 'N/A'}</td>
                          <td>{user.address}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.roleId.map((role) => role.role).join(', ')}</td>
                          <td>
                            <button className="btn btn-warning me-2">Edit</button>
                            <button
                              className={`btn ${
                                user.status === 'active' ? 'btn-success' : 'btn-danger'
                              }`}
                            >
                              {user.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddUserModal showModal={isAddUserModalOpen} handleCloseModal={closeAddUserModal} />
      {showEditModal && (
        <EditUserModal 
          showModal={showEditModal} 
          handleCloseModal={handleCloseEditModal} 
          user={selectedUser}
        />
      )}
    </main>
  );
}

export default UserInfo;