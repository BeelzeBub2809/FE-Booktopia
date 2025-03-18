import React from 'react';
import './headerEmp.css';
import UserProfileModal from '../../modal/userProfileModal';
import { useNavigate } from 'react-router-dom';
function HeaderEmp() {
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);
  const navigation = useNavigate();
  const handleLogout = async () => {
    await fetch("http://localhost:9999/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
    navigation("/login-res");
  };
  return (
    <header id="header" class="header fixed-top d-flex align-items-center">

      <div class="d-flex align-items-center justify-content-between">
        <a href="/" class="logo d-flex align-items-center">
          <span class="d-none d-lg-block">Booktopia</span>
        </a>
      </div>
      <div class="header-div ms-auto">
        <ul class="d-flex align-items-center">

          <li class="nav-item d-block d-lg-none">
            <a class="nav-link nav-icon search-bar-toggle " href="#">
              <i class="bi bi-search"></i>
            </a>
          </li>

          <li class="nav-item dropdown pe-3">

            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <h4 class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</h4>
            </a>

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li class="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li onClick={handleShowProfileModal}>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center" href="#" onClick={handleLogout}>
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>

            </ul>
          </li>

        </ul>
      </div>
      
    </header>
  );
}

export default HeaderEmp;