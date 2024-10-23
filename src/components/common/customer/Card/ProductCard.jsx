import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";



function ProductCard({ product }) {
  return (
    <div className="card-basic">
      <Link to={`/shop/${product._id}`}>
        <img src={product.image || "default-image-path.jpg"} alt={product.title} />
      </Link>

      <div className="card-item-details">
        <div className="item-title">
          <h4>{product.name}</h4>
        </div>
        <h5 className="item-seller">- Sold by &nbsp;Tuan</h5>
        <p>
          <b>{product.price} &nbsp;&nbsp;</b>
          <del>10000</del> &nbsp;&nbsp;
          <span className="discount-on-card">(20 % off)</span>
        </p>
        <div className="card-button">
          <button className="card-icon-btn add-to-wishlist-btn outline-card-secondary-btn">
            <i className="fa fa-heart-o" aria-hidden="true"></i>
          </button>
        </div>

      </div>
    </div>
  );
}

export { ProductCard };
