import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  // Define the link based on the product type
  const productLink = product.type === 'combo'
    ? `/shop/combo/${product._id}`
    : `/shop/${product._id}`;

  // Calculate the discounted price if a discount exists
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="card-basic">
      <Link to={productLink}>
        <img
          src={product.image ? product.image[0] : "default-image-path.jpg"}
          alt={product.name}
        />
      </Link>

      <div className="card-item-details">
        <div className="card-item-title">
          <h4>{product.name}</h4>
        </div>
        <div className="card-item-price">
          {/* Render the discounted price and original price conditionally */}
          {hasDiscount ? (
            <>
              <b className="card-item-price-new">{discountedPrice.toFixed(0)} VND</b>
              <br />
              <del className="card-item-price-old">{product.price} VND</del>
              <span className="discount-on-card">({product.discount}% off)</span>
            </>
          ) : (
            <b className="card-item-price-new">{product.price} VND</b>
          )}
        </div>

      </div>
    </div>
  );
}

export { ProductCard };
