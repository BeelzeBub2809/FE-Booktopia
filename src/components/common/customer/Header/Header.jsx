import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { BsShopWindow, BsFillBagFill, BsFillPersonFill } from "react-icons/bs";
import UserProfileModal from '../../modal/userProfileModal';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigation = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  const handleLogout = async() => {
    await fetch('http://localhost:9999/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
    localStorage.removeItem('userId');
    localStorage.removeItem('userRoles');
    setIsLoggedIn(false);
    navigation('/login-res')
}

  return (
    <div className="top-bar">
      <div className="left-topbar-container">
        <Link to="/">
          <h2 className="top-bar-brand-name">Booktopia</h2>
        </Link>
        <div className="search-bar1">
          <input
            className="search-bar-input"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="right-topbar-container">
        {/* Conditionally render Logout or Login button */}
        {isLoggedIn ? (
          <button className="navbar-login-btn solid-primary-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login-res">
            <button className="navbar-login-btn solid-primary-btn">Login</button>
          </Link>
        )}

        <Link to="/shop">
          <button className="icon-btn">
            <div>
              <i className="fa-solid fa-shop"></i>
            </div>
          </button>
        </Link>

        <Link to="/wishlist">
          <button className="icon-btn">
            <div className="icon-count-badge">
              <i className="fa fa-heart-o" aria-hidden="true"></i>
              
            </div>
          </button>
        </Link>

        <Link to="/cart">
          <button className="icon-btn">
            <div className="icon-count-badge">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
             
            </div>
          </button>
        </Link>

        <Link to="/orders">
          <button className="icon-btn">
            <div className="icon-count-badge">
              <BsFillBagFill style={{ marginBottom: "4px" }} />
             
            </div>
          </button>
        </Link>

        <button className="icon-btn" onClick={handleShowProfileModal}>
          <div className="icon-count-badge">
            <i className="fa-solid fa-user"></i>
          </div>
        </button>
      </div>
      <UserProfileModal showModal={showProfileModal} handleCloseModal={handleCloseProfileModal} />
    </div>
  );
}

export { Header };
