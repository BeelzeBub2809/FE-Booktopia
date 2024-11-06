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
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:9999/api/product")
      .then(response => response.json())
      .then(data => {
        // Filter to include only products with status "active"
        const activeProducts = data.data.filter(product => product.status === "active");
        // Sort products by newest first
        const sortedProducts = activeProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // Take only the 4 most recent products
        setProducts(sortedProducts.slice(0, 4));
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);
  

  return (
    <div className="new-arrivals-container">
      {loading ? (
        <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
      ) : (
        products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} /> // Render ProductCard for each product
          ))
        ) : (
          <p>No new arrivals available.</p> // Message if no products are found
        )
      )}
    </div>
  );
}

export { NewArrivals };
