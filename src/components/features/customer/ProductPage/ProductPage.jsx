import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookCover from "../../../../Assets/Images/Book_Covers/50_Shades_Of_Grey.jpg";
import "./ProductPage.css";
import CartService from "../../../../services/cart/cartService";
import Swal from "sweetalert2";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [relatedBooks, setRelatedBooks] = useState([]);
  const [allBook, setAllBook] = useState([]);

  // Combined fetch for product and related books
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await fetch(`http://localhost:9999/api/product/${id}`);
        if (!productResponse.ok) throw new Error("Failed to fetch product data.");

        const productData = await productResponse.json();
        setProduct(productData.data);

        // Fetch all products to find related books
        const allProductsResponse = await fetch("http://localhost:9999/api/product");
        if (!allProductsResponse.ok) throw new Error("Failed to fetch all products.");

        const allProductsData = await allProductsResponse.json();
        setAllBook(allProductsData.data); // Set the correct data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  const {
    name,
    author,
    image = [],
    price,
    reviews = [
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
    ], // Default to sample reviews if undefined
  } = product;

  const handleAddToCart = async (productId) => {
    try {
      const res = await CartService.addToCart({ productId });
      Swal.fire({
        title: "Success",
        text: res.message,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % image.length);
  const handlePreviousImage = () => setCurrentImageIndex((prev) => (prev === 0 ? image.length - 1 : prev - 1));

  const relatedBooks = allBook.filter(b => 
    product.categoryId.some(catId => b.categoryId.includes(catId))
  );
  
  return (
    <div className="product-page-container container mt-5">
      <div className="product-page-item">
        {/* Image Section */}
        <div className="product-image-section">
          <div className="main-image-container">
            <img className="main-image" src={image[currentImageIndex] || bookCover} alt={name} />
          </div>
          <div className="image-controls">
          <button className="btn btn-image" onClick={handlePreviousImage} disabled={image.length <= 1}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="thumbnail-container">
            {image.map((imgSrc, index) => (
              <img
                key={index}
                className={`thumbnail-image ${index === currentImageIndex ? "active-thumbnail" : ""}`}
                src={imgSrc}
                alt={`${name} thumbnail ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          <button className="btn btn-image" onClick={handleNextImage} disabled={image.length <= 1}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
          
        </div>

        {/* Product Details Section */}
        <div className="product-details-section">
          <h2 className="product-name">{name}</h2>
          <hr />
          <p className="product-author">
            <b>Author: </b> {author}
          </p>
          <p className="product-description">
            <b>Description: </b> This is a description test
          </p>
          <p className="product-rating">
            <b>Rating: </b> 5
          </p>
          <h3 className="product-price">
            VND.100 &nbsp;&nbsp;
            <del>VND {price}</del> &nbsp;&nbsp;
            <span className="discount">(20% off)</span>
          </h3>
          <div className="product-action-buttons">
            <button className="btn btn-primary">Add to wishlist</button>
            <button className="btn btn-warning" onClick={() => handleAddToCart(product._id)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mt-5">
        <h3>Product Reviews</h3>
        <div className="review-list p-3">
          {reviews.length > 0 ? reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <strong>{review.reviewer}</strong>
                <span className="rating">{"⭐".repeat(review.rating)}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          )) : <p>No reviews available</p>}
        </div>

        <h4>Write a Review</h4>
        <form className="mt-3 p-3">
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Your Comment</label>
            <textarea className="form-control" id="comment" rows="3" placeholder="Write your comment here"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
      </div>

      {/* Related Books Section */}
      <div className="related-books-section">
        <h3>Related Books</h3>
        <div className="related-books-list">
          {relatedBooks.length > 0 ? relatedBooks.map((book, index) => (
            <div key={index} className="related-book-card">
              <img className="related-book-image" src={book.image || bookCover} alt={book.name} />
              <h4>{book.name}</h4>
              <p>by {book.author}</p>
            </div>
          )) : <p>No related books found</p>}
        </div>
      </div>
    </div>
  );
}

export { ProductPage };
