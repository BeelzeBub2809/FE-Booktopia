import React, { useEffect, useState } from "react";
import "./Shop.css";
import { Sidebar, ProductCard } from "../Index/index.js";

function Shop() {
    const [products, setProducts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, genresResponse] = await Promise.all([
                    fetch("http://localhost:9999/api/product"),
                    fetch("http://localhost:9999/api/category")
                ]);

                if (!productsResponse.ok) {
                    throw new Error("Failed to fetch products.");
                }
                if (!genresResponse.ok) {
                    throw new Error("Failed to fetch genres.");
                }

                const productsData = await productsResponse.json();
                const genresData = await genresResponse.json();

                setProducts(productsData);
                setGenres(genresData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Function to handle genre selection
    const handleGenreChange = (genreId) => {
        setSelectedGenres((prevSelected) => {
            if (prevSelected.includes(genreId)) {
                return prevSelected.filter((g) => g !== genreId); // Uncheck
            } else {
                return [...prevSelected, genreId]; // Check
            }
        });
    };

    // Filter products based on selected genres
    const filteredProducts = selectedGenres.length > 0
        ? products.filter(product => 
            product.categoryId.some(id => selectedGenres.includes(id)) // Check if any categoryId matches selected genres
        )
        : products;

    return (
        <div className='shop-container'>
            <Sidebar genres={genres} onGenreChange={handleGenreChange} />
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
