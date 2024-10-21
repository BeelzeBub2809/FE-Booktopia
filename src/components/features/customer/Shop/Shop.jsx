import React, { useEffect, useState } from "react";
import "./Shop.css";
import { Sidebar, ProductCard } from "../Index/index.js";

function Shop() {
    const [products, setProducts] = useState([]);
    const [genres, setGenres] = useState([]);

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

                setProducts(productsData); // Set the fetched products to state
                setGenres(genresData); // Set the fetched genres to state

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='shop-container'>
            <Sidebar genres ={genres} />
            <div className='products-container'>
                <h2 className='total-product'>Showing {products.length} products</h2>
                <div className="products-card-grid">     
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Shop };
