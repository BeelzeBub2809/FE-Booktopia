import React, { useEffect, useState } from "react";
import "./Shop.css";
import { Sidebar, ProductCard } from "../Index/index.js";

function Shop() {
    const [products, setProducts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(250000);
    const [sortOrder, setSortOrder] = useState("price-low-to-high"); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, genresResponse] = await Promise.all([
                    fetch("http://localhost:9999/api/product"),
                    fetch("http://localhost:9999/api/category")
                ]);
                if (!productsResponse.ok) throw new Error("Failed to fetch products.");
                if (!genresResponse.ok) throw new Error("Failed to fetch genres.");
                const productsData = await productsResponse.json();
                const genresData = await genresResponse.json();
                setProducts(productsData.data);
                setGenres(genresData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleGenreChange = (genreId) => {
        setSelectedGenres((prevSelected) => 
            prevSelected.includes(genreId) 
            ? prevSelected.filter((g) => g !== genreId) 
            : [...prevSelected, genreId]
        );
    };

    const handlePriceChange = (minPrice, maxPrice) => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const filteredProducts = products
    .filter(product => {
      // Check if the product has status "active"
      if (product.status !== "active") {
        return false; // Exclude products that are not active
      }
  
      let inSelectedGenres = true;
  
      if (selectedGenres.length > 0) {
        if (product.type === "single" && product.category) {
          // Check if single product matches selected genres
          inSelectedGenres = product.category.some(cat => selectedGenres.includes(cat._id));
        } else if (product.type === "combo" && product.products) {
          // Check if any product in the combo matches selected genres
          inSelectedGenres = product.products.some(
            p => p.category && p.category.some(cat => selectedGenres.includes(cat._id))
          );
        }
      }
  
      const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
      return inSelectedGenres && inPriceRange;
    })
    .sort((a, b) => {
      if (sortOrder === "price-low-to-high") return a.price - b.price;
      if (sortOrder === "price-high-to-low") return b.price - a.price;
      if (sortOrder === "top-sellers") return b.sold - a.sold;
      return 0;
    });
  

    return (
        <div className='shop-container'>
            <Sidebar 
                genres={genres} 
                onGenreChange={handleGenreChange} 
                onPriceChange={handlePriceChange} 
                onSortChange={handleSortChange} 
            />
            <div className='products-container'>
                <h2 className='total-product'>Showing {filteredProducts.length} products</h2>
                <div className="products-card-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Shop };
