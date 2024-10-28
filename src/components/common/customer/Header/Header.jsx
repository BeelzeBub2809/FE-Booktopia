import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { BsShopWindow, BsFillBagFill, BsFillPersonFill } from "react-icons/bs";
import UserProfileModal from "../../modal/userProfileModal";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigation = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const id = userId ? userId.replace(/"/g, '') : null;
    if (userId) {
      setIsLoggedIn(true);
      fetchUserData(id);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`http://localhost:9999/api/user/${id}`);
      const result = await response.json();
      if (result.status === "success") {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await fetch(
          `http://localhost:9999/api/product/search?name=${value}`
        );
        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          setSearchResults(result.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  const handleLogout = async () => {
    await fetch("http://localhost:9999/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
    setIsLoggedIn(false);
    navigation("/login-res");
  };


  return (
    <div className="top-bar">
      <div className="left-topbar-container">
        <Link to="/">
          <h2 className="top-bar-brand-name">Booktopia</h2>
        </Link>
        <div className="search-bar1">
          <div className="position-relative">
            <input
              type="text"
              className="form-control search-bar-input"
              placeholder="Tìm kiếm sách..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((item) => (
                  <Link
                    to={`/shop/${item._id}`}
                    key={item._id}
                    className="search-result-item"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                  >
                    <div className="search-result-image-container">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="search-result-image"
                      />
                    </div>
                    <div className="search-result-content">
                      <h3 className="search-result-title">{item.name}</h3>
                      <div className="search-result-price">
                        <span className="current-price">
                          {item.price.toLocaleString()}đ
                        </span>
                        {item.price.toLocaleString() && (
                          <span className="original-price">
                            {item.price.toLocaleString()}đ
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="right-topbar-container">
        {isLoggedIn ? (
          <button
            className="navbar-login-btn solid-primary-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login-res">
            <button className="navbar-login-btn solid-primary-btn">
              Login
            </button>
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
        {isLoggedIn && user && (
        <button className="icon-btn" onClick={handleShowProfileModal}>
          <div className="icon-count-badge">
            <i className="fa-solid fa-user"></i>
          </div>
        </button>
      )}
      </div>
      {isLoggedIn && user && (
        <UserProfileModal
          showModal={showProfileModal}
          handleCloseModal={handleCloseProfileModal}
          user={user}
        />
      )}
      
    </div>
  );
}

export { Header };
