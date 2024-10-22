import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookCover from "../../../../Assets/Images/Book_Covers/50_Shades_Of_Grey.jpg";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams(); // Get the product ID from the URL params
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track any errors

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9999/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  // Destructure product data
  const {
    name,
    author,
    image,
    price,
    reviews = [ {
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
    }], // Default to empty array if undefined
    relatedBooks = [
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
    ], // Default to empty array if undefined
  } = product;

  return (
    <div className="product-page-container container mt-5">
      <div className="product-page-item">
        <img className="bookcover-image" src={image} alt={name}></img>
        <div className="item-details">
          <h2>{name}</h2>
          <hr></hr>
          <p>
            <b>Author: </b> &nbsp;&nbsp; <span>{author}</span>
          </p>
          <p className="item-description">
            <b>Description: </b> &nbsp;&nbsp; <span>This is a description test</span>
          </p>
          <p className="item-rating">
            <b>Rating: </b> &nbsp;&nbsp; <span>5</span>
          </p>
          <h3 className="item-price-details">
            VND.100 &nbsp;&nbsp;
            <del>VND {price}</del> &nbsp;&nbsp;
            <span className="discount-on-item">(20% off)</span>
          </h3>

          <div className="item-buttons">
            <button className="solid-primary-btn">Add to wishlist</button>
            <button className="solid-warning-btn">Add to cart</button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mt-5">
        <h3>Product Reviews</h3>
        <div className="review-list p-3">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <strong>{review.reviewer}</strong>
                  <span className="rating">{"⭐".repeat(review.rating)}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>

        <h4>Write a Review</h4>
        <form className="mt-3 p-3">
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Your Comment
            </label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              placeholder="Write your comment here"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      </div>

      {/* Related Books Section */}
      <div className="related-books-section">
        <h3>Related Books</h3>
        <div className="related-books-list">
          {relatedBooks.length > 0 ? (
            relatedBooks.map((book, index) => (
              <div key={index} className="related-book-card">
                <img
                  className="related-book-image"
                  src={book.imgSrc}
                  alt={book.title}
                />
                <h4>{book.title}</h4>
                <p>by {book.author}</p>
              </div>
            ))
          ) : (
            <p>No related books available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export { ProductPage };
