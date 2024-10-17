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

  const relatedBooks = [
    {
      title: "Brida",
      author: "Paulo Coelho",
      imgSrc: bookCover,
    },
    {
      title: "Veronika Decides to Die",
      author: "Paulo Coelho",
      imgSrc: bookCover,
    },
  ];

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
      <h3>Related Books</h3>
      <div className="related-books-section">
       
        <div className="related-books-list">
          {relatedBooks.map((book, index) => (
            <div key={index} className="related-book-card">
              <img
                className="related-book-image"
                src={book.imgSrc}
                alt={book.title}
              />
              <h4>{book.title}</h4>
              <p>by {book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ProductPage };