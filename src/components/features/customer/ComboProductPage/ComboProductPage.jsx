import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bookCover from "../../../../Assets/Images/Book_Covers/50_Shades_Of_Grey.jpg";
import "./ComboProductPage.css";
import CartService from "../../../../services/cart/cartService";
import Swal from "sweetalert2";

function ComboProductPage() {
  const { id } = useParams();
  const [combo, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allBook, setAllBook] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); // State for reviews

  // Combined fetch for product, related books, and reviews
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product data
        const productResponse = await fetch(
          `http://localhost:9999/api/combo/${id}`
        );
        if (!productResponse.ok)
          throw new Error("Failed to fetch product data.");
        const productData = await productResponse.json();
        setProduct(productData.data);

        // Fetch all products for related books
        const allProductsResponse = await fetch(
          "http://localhost:9999/api/product"
        );
        if (!allProductsResponse.ok)
          throw new Error("Failed to fetch all products.");
        const allProductsData = await allProductsResponse.json();
        setAllBook(allProductsData.data);

        // Fetch reviews for the product
        await fetchReviews(); // Fetch reviews initially
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
      if (!reviewResponse.ok) throw new Error("Failed to fetch product reviews.");
      const reviewData = await reviewResponse.json();

      // Filter reviews to only include those with status "active"
      const activeReviews = reviewData.data.filter(review => review.status === "active");
      setReviews(activeReviews);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!combo) return <div>No product found.</div>;

  const handleAddToCart = async (comboId) => {
    try {
      const res = await CartService.addComboToCart({ comboId });
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
    setCurrentImageIndex((prev) => (prev + 1) % combo.image.length);
  const handlePreviousImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? combo.image.length - 1 : prev - 1
    );

  const relatedBooks = combo && combo.categoryId && combo.categoryId.length > 0
    ? allBook.filter((b) => {
      console.log('Product category IDs:', combo.categoryId);
      console.log('Book categories:', b.category);
      return b.category.some((cat) => combo.categoryId.includes(cat._id));
    })
    : [];

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
      // Fetch the updated reviews after submitting the new review
      await fetchReviews(); // Call the function to fetch reviews

      // Reset comment and rating state
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

      // Fetch updated reviews after deletion
      await fetchReviews(); // Call the function to fetch reviews again

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

  const hasDiscount = combo.discount > 0;
  const discountedPrice = hasDiscount
    ? combo.price - (combo.price * combo.discount) / 100
    : combo.price;

  return (
    <div className="product-page-container container mt-5">
      <div className="product-page-item">
        {/* Image Section */}
        <div className="product-image-section">
          <div className="main-image-container">
            <img
              className="main-image"
              src={combo.image[currentImageIndex] || bookCover}
              alt={combo.name}
            />
          </div>
          <div className="image-controls">
            <button
              className="btn btn-image"
              onClick={handlePreviousImage}
              disabled={combo.image.length <= 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="thumbnail-container">
              {combo.image.map((imgSrc, index) => (
                <img
                  key={index}
                  className={`thumbnail-image ${index === currentImageIndex ? "active-thumbnail" : ""
                    }`}
                  src={imgSrc}
                  alt={`${combo.name} thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            <button
              className="btn btn-image"
              onClick={handleNextImage}
              disabled={combo.image.length <= 1}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-details-section">
          <h2 className="product-name">{combo.name}</h2>
          <hr />
          <p className="product-author">
            {combo.productId.map((product) => (
              <span key={product._id}>{product.author} , </span>
            ))}
          </p>
          <p className="product-description">
            <b>Description: </b> This is a description test
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
                <del className="product-price-old"> {combo.price} VND</del>
                <span className="product-discount">
                  ({combo.discount}% off)
                </span>
              </>
            ) : (
              <b className="product-price-new">Price: {combo.price} VND</b>
            )}
          </h3>
          <div className="product-action-buttons">
            <button
              className="btn btn-warning"
              onClick={() => handleAddToCart(combo._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="related-books-section">
        <h3>Combo Include</h3>
        <div className="combo-books-list">
          {combo.productId.length > 0 ? (
            combo.productId.map((book, index) => (
              <div key={index} className="related-book-card">
                <Link to={`/shop/${book._id}`}>
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

      {/* Reviews Section */}
      <div className="container mt-5">
        <h3>Product Reviews</h3>
        <div className="review-list p-3">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <strong>{review.customerId.userId.userName}</strong>
                  <span className="rating">{"⭐".repeat(review.rating)}</span>
                  {/* Check if the review belongs to the current user */}
                  {review.customerId.userId._id === localStorage.getItem("userId").replace(/"/g, '') && (
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
      </div>

      {/* Related Books Section */}
      <div className="related-books-section">
        <h3>Related Books</h3>
        <div className="related-books-list">
          {relatedBooks.length > 0 ? (
            relatedBooks.map((book, index) => (
              <div key={index} className="related-book-card">
                <Link to={`/shop/${book._id}`}>
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

export { ComboProductPage };
