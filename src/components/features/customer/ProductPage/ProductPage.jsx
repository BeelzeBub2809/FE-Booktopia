import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  const [allBook, setAllBook] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await fetch(
          `http://localhost:9999/api/product/${id}`
        );
        if (!productResponse.ok)
          throw new Error("Failed to fetch product data.");
        const productData = await productResponse.json();
        setProduct(productData.data);

        const allProductsResponse = await fetch(
          "http://localhost:9999/api/product"
        );
        if (!allProductsResponse.ok)
          throw new Error("Failed to fetch all products.");
        const allProductsData = await allProductsResponse.json();
        setAllBook(allProductsData.data);

        await fetchReviews();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const reviewResponse = await fetch(
        `http://localhost:9999/api/review/book/${id}`
      );
      if (!reviewResponse.ok)
        throw new Error("Failed to fetch product reviews.");
      const reviewData = await reviewResponse.json();
      const activeReviews = reviewData.data.filter(
        (review) => review.status === "active"
      );
      setReviews(activeReviews);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

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

  const handleNextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % product.image.length);
  const handlePreviousImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.image.length - 1 : prev - 1
    );

    const relatedBooks =
    product && product.category && product.category.length > 0
      ? allBook.filter((b) =>
          b.category.some((cat) =>
            product.category.map((pCat) => pCat._id).includes(cat._id)
          )
        )
      : [];
  

  console.log(allBook);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9999/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: localStorage.getItem("userId"),
          productId: id,
          rating,
          content: comment,
        }),
      });

      if (!res.ok) throw new Error("You have already reviewed this product.");
      await fetchReviews();
      setComment("");
      setRating(0);

      Swal.fire({
        title: "Success",
        text: "Review was created successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await fetch(`http://localhost:9999/api/review/${reviewId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete the review.");
      await fetchReviews();

      Swal.fire({
        title: "Success",
        text: "Review deleted successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="product-page-container container mt-5">
      <div className="product-page-item">
        <div className="product-image-section">
          <div className="main-image-container">
            <img
              className="main-image"
              src={product.image[currentImageIndex] || bookCover}
              alt={product.name}
            />
          </div>
          <div className="image-controls">
            <button
              className="btn btn-image"
              onClick={handlePreviousImage}
              disabled={product.image.length <= 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="thumbnail-container">
              {product.image.map((imgSrc, index) => (
                <img
                  key={index}
                  className={`thumbnail-image ${
                    index === currentImageIndex ? "active-thumbnail" : ""
                  }`}
                  src={imgSrc}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            <button
              className="btn btn-image"
              onClick={handleNextImage}
              disabled={product.image.length <= 1}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="product-details-section">
          <h2 className="product-name">{product.name}</h2>
          <hr />
          <p className="product-author">
            <b>Author: </b> {product.author.join(", ")}
          </p>
          <p className="product-description">
            <b>Description: </b> {product.description}
          </p>
          <p className="product-rating">
            <b>Rating: </b> 5
          </p>
          <h3 className="product-price">
            {hasDiscount ? (
              <>
                <b className="product-price-new">
                Price: {discountedPrice.toFixed(0)} VND
                </b>
                <del className="product-price-old"> {product.price} VND</del>
                <span className="product-discount">
                  ({product.discount}% off)
                </span>
              </>
            ) : (
              <b className="product-price-new">Price: {product.price} VND</b>
            )}
          </h3>
          <div className="product-action-buttons">
            <button
              className="btn btn-warning"
              onClick={() => handleAddToCart(product._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
      <h3>Product Reviews</h3>
      <div className="review-list p-3">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-header">
                <strong>{review.customerId.userId.userName}</strong>
                <span className="rating">{"⭐".repeat(review.rating)}</span>
                {review.customerId.userId._id === localStorage.getItem("userId")?.replace(/"/g, "") && (
                  <button
                    className="btn btn-danger btn-sm ms-2 float-end"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    
      {localStorage.getItem("userId") ? (
        <>
          <h4>Write a Review</h4>
          <form onSubmit={handleReviewSubmit} className="mt-3 p-3">
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Your Comment
              </label>
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <select
                id="rating"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </>
      ) : (
        <p>Please log in to post a review.</p>
      )}
    </div>
    

      <div className="related-books-section">
      <h3>Related Books</h3>
      <div className="related-books-list">
        {relatedBooks.length > 0 ? (
          relatedBooks.map((book, index) => (
            <div key={index} className="related-book-card">
              <Link
                to={book.type === "combo" ? `/shop/combo/${book._id}` : `/shop/${book._id}`}
              >
                <img
                  className="related-book-image"
                  src={book.image || bookCover}
                  alt={book.name}
                />
              </Link>
              <h4>{book.name}</h4>
              <p>by {book.author}</p>
            </div>
          ))
        ) : (
          <p>No related books found</p>
        )}
      </div>
    </div>
    
    </div>
  );
}

export { ProductPage };
