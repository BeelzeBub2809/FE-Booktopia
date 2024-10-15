import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { BsShopWindow, BsFillBagFill } from "react-icons/bs";

function Header() {
  return (
    <div className="top-bar">
      <div className="left-topbar-container">
        <Link to="/">
          <h2 className="top-bar-brand-name">Booktopia</h2>
        </Link>
        <div className="search-bar">
          <input
            className="search-bar-input"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="right-topbar-container">
        {/* Conditionally render Logout or Login button */}
        <button className="navbar-login-btn solid-primary-btn">Logout</button>
        
        <Link to="/auth/login-res">
          <button className="navbar-login-btn solid-primary-btn">Login</button>
        </Link>

        <Link to="/shop">
          <button className="icon-btn">
            <div>
              <BsShopWindow />
            </div>
          </button>
        </Link>

        <Link to="/wishlist">
          <button className="icon-btn">
            <div className="icon-count-badge">
              <i className="fa fa-heart-o fa-x" aria-hidden="true"></i>
              <span className="count-badge-x">7</span>
            </div>
          </button>
        </Link>

        <Link to="/cart">
          <button className="icon-btn">
            <div className="icon-count-badge">
              <i className="fa fa-shopping-cart fa-x" aria-hidden="true"></i>
              <span className="count-badge-x">8</span>
            </div>
          </button>
        </Link>

        <Link to="/orders">
          <button className="icon-btn">
            <div className="icon-count-badge">
              <BsFillBagFill style={{ marginBottom: "4px" }} />
              <span className="count-badge-x">8</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export { Header };
