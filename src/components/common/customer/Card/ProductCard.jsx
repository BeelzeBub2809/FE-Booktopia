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
        <div className="card-item-title">
          <h4>{product.name}</h4>
        </div>
        <div className="card-item-price">
          <b className="card-item-price-new">{product.price} VND</b>
          <br/>
          <del className="card-item-price-old">{product.price}</del>   VND
          <span className="discount-on-card">(20 % off)</span>
        </div>
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
