import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import bookCover from "../../../../Assets/Images/Book_Covers/50_Shades_Of_Grey.jpg"; // Đảm bảo rằng đường dẫn này là chính xác.

function ProductCard() {
  return (
    <div className="card-basic">
      <Link to={`/shop/${1}`}>
        <img src={bookCover} alt="50 Shades of Grey" />
      </Link>

      <div className="card-item-details">
        <div className="item-title">
          <h4> Book_Covers</h4>
        </div>
        <h5 className="item-seller">- Sold by &nbsp;Tuan</h5>
        <p>
          <b>360 &nbsp;&nbsp;</b>
          <del>450</del> &nbsp;&nbsp;
          <span className="discount-on-card">(90% off)</span>
        </p>
        <div className="card-button">
          <button className="card-icon-btn add-to-wishlist-btn outline-card-secondary-btn">
            <i className="fa fa-heart-o" aria-hidden="true"></i>
          </button>
        </div>
        <div className="badge-on-card">hello</div>
      </div>
    </div>
  );
}

export { ProductCard };
