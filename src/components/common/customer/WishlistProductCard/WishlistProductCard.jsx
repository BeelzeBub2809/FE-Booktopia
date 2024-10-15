import React from 'react';
import { Link } from "react-router-dom";
import './WishlistProductCard.css';
import imgSrc1 from "../../../../Assets/Images/Book_Covers/Attack_On_Titan.jpg";

export default function WishlistProductCard() {
  // Dữ liệu tĩnh cho sản phẩm trong danh sách yêu thích
  const productdetails = {
    _id: "1",
    imgSrc: "https://example.com/path/to/book_cover.jpg",
    imgAlt: "Book Cover",
    bookName: "The Alchemist",
    author: "Paulo Coelho",
    discountedPrice: 299,
    originalPrice: 499,
    discountPercent: 40,
  };

  const { _id, imgSrc, imgAlt, bookName, author, discountedPrice, originalPrice, discountPercent } = productdetails;

  return (
    <Link 
      to={`/shop/${_id}`}  
      
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-basic wishlist-card">
        <img src={imgSrc1} alt={imgAlt} />
        <div className="card-item-details">
          <div className="item-title">
            <h4>{bookName}</h4>
          </div>
          <h5 className="item-author">- By &nbsp;{author}</h5>
          <p>
            <b>Rs. {discountedPrice} &nbsp;&nbsp;</b>
            <del>Rs. {originalPrice}</del> &nbsp;&nbsp;
            <span className="discount-on-card">({discountPercent}% off)</span>
          </p>
          <div className="card-button">
            <button className={`card-icon-btn add-to-wishlist-btn outline-card-secondary-btn`}>
              <i className={`fa fa-heart-o`} aria-hidden="true"></i>
            </button>
          </div>
          <div className="badge-on-card">
            Hello
          </div>
          <div className="card-text-overlay-container">
            <p>Out of Stock</p>
          </div>
        </div>
        <button className="solid-primary-btn add-wishlist-item-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

export { WishlistProductCard };
