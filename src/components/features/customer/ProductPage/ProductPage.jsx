import React from 'react';
import "./ProductPage.css";
import { Star, User } from 'lucide-react';
import bookCover from "../../../../Assets/Images/Book_Covers/50_Shades_Of_Grey.jpg";

function ProductPage() {
  // Dữ liệu tĩnh cho sản phẩm
  const imgSrc = bookCover;
  const imgAlt = "Book Cover";
  const bookName = "The Alchemist";
  const author = "Paulo Coelho";
  const description = "A novel about a young shepherd named Santiago who travels from Spain to Egypt in search of treasure.";
  const rating = 4.7;
  const discountedPrice = 299;
  const originalPrice = 499;
  const discountPercent = 40;
  const outOfStock = false;

  // Static reviews data
  const reviews = [
    {
      reviewer: "John Doe",
      comment: "Amazing book! A must-read for everyone.",
      rating: 5,
      date: "July 27, 2021",
      location: "United States",
      verifiedPurchase: true,
    },
    {
      reviewer: "Jane Smith",
      comment: "Inspirational and thought-provoking.",
      rating: 4,
      date: "June 29, 2021",
      location: "United States",
      verifiedPurchase: true,
    },
  ];

  const ReviewItem = ({ review }) => (
    <div className="review-item mb-6 border-b pb-4">
      <div className="flex items-center mb-2">
        <User className="w-8 h-8 text-gray-400 mr-2" />
        <div>
          <h3 className="font-semibold">{review.reviewer}</h3>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={i < review.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">Reviewed in {review.location} on {review.date}</p>
      {review.verifiedPurchase && (
        <p className="text-sm text-orange-600 mb-2">Verified Purchase</p>
      )}
      <p className="mb-2">{review.comment}</p>
      <div className="flex gap-2">
        <button className="px-4 py-1 border border-gray-300 rounded-full text-sm">Helpful</button>
        <button className="px-4 py-1 border border-gray-300 rounded-full text-sm">Report</button>
      </div>
    </div>
  );

  return (
    <div className="product-page-container">
      <div className="product-page-item">
        <img className="bookcover-image" src={imgSrc} alt={imgAlt}></img>
        <div className="item-details">
          <h2>{bookName}</h2>
          <hr></hr>
          <p><b>Author: </b> &nbsp;&nbsp; <span>{author}</span></p>
          <p className="item-description"><b>Description: </b> &nbsp;&nbsp; <span>{description}</span></p>
          <p className="item-rating"><b>Rating: </b> &nbsp;&nbsp; <span>{rating}</span></p>
          <h3 className="item-price-details">
            Rs. {discountedPrice} &nbsp;&nbsp;
            <del>Rs. {originalPrice}</del> &nbsp;&nbsp;
            <span className="discount-on-item">({discountPercent}% off)</span>
          </h3>
          {outOfStock === true && (
            <p className="out-of-stock-text">Item is currently out of stock</p>
          )}
          <div className="item-buttons">
            {outOfStock === true ? (
              <button className="item-notify-me-btn solid-primary-btn">Notify Me</button>
            ) : (
              <>
                <button className="solid-primary-btn">Add to wishlist</button>
                <button className="solid-warning-btn">Add to cart</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="product-page-reviews mt-8">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export { ProductPage };