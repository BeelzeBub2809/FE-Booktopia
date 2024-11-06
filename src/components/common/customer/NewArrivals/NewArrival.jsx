import React, { useEffect, useState } from "react";
import { ProductCard } from "../../../features/customer/Index/index"; // Import component ProductCard
import Lottie from "react-lottie"; // Lottie for animation
import LoadingLottie from "../../../../Assets/Lottie/loading-0.json"; // Lottie animation JSON
import { Link } from "react-router-dom";

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:9999/api/product")
      .then((response) => response.json())
      .then((data) => {
        // Filter active products and sort by newest first
        const activeProducts = data.data.filter(
          (product) => product.status === "active"
        );
        const sortedProducts = activeProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Filter products by type
  const singleProducts = products.filter(
    (product) => product.type === "single"
  );
  const comboProducts = products.filter((product) => product.type === "combo");
  const saleprodcuts = products.filter((product) => product.discount > 0);

  return (
    <div className="list-product">
      <div className="new-arrivals-container">
        {loading ? (
          <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
        ) : singleProducts.length > 0 ? (
          singleProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> // Render ProductCard for each product
          ))
        ) : (
          <p>No new arrivals available.</p> // Message if no products are found
        )}
      </div>
      <h1 className="homepage-headings">Hot Combo</h1>
      <div className="new-arrivals-container">
        {loading ? (
          <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
        ) : comboProducts.length > 0 ? (
          comboProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> // Render ProductCard for each product
          ))
        ) : (
          <p>No new arrivals available.</p> // Message if no products are found
        )}
      </div>

      <h1 className="homepage-headings">Hot Sale</h1>
      <div className="new-arrivals-container">
        {loading ? (
          <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
        ) : saleprodcuts.length > 0 ? (
          saleprodcuts.map((product) => (
            <ProductCard key={product.id} product={product} /> // Render ProductCard for each product
          ))
        ) : (
          <p>No new arrivals available.</p> // Message if no products are found
        )}
      </div>
    </div>
  );
}

export { NewArrivals };
