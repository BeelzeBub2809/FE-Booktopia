import React, { useState } from 'react';
import "./Shop.css";
import { Sidebar, ProductCard, Pagination } from "../Index/index.js";

function Shop() {
    // Dữ liệu tĩnh cho sản phẩm
    const productsAvailableList = [
        {
            _id: "1",
            bookName: "The Alchemist",
            author: "Paulo Coelho",
            imgSrc: "https://example.com/alchemist.jpg",
            discountedPrice: 299,
            originalPrice: 499,
            rating: 4.7,
            description: "A novel about a young shepherd named Santiago who travels from Spain to Egypt in search of treasure.",
            discountPercent: 40,
        },
        {
            _id: "2",
            bookName: "1984",
            author: "George Orwell",
            imgSrc: "https://example.com/1984.jpg",
            discountedPrice: 199,
            originalPrice: 399,
            rating: 4.8,
            description: "A dystopian social science fiction novel and cautionary tale about the future.",
            discountPercent: 50,
        },
        // Thêm nhiều sản phẩm ở đây
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Tính toán các sản phẩm hiển thị trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProductsAvailableList = productsAvailableList.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className='shop-container'>
            <Sidebar />
            <div className='products-container'>
                <h2 className='total-product'>Showing {productsAvailableList.length} products</h2>
                <div className="products-card-grid">
                    {currentProductsAvailableList.map(productdetails => (
                        <ProductCard key={productdetails._id} productdetails={productdetails} />
                    ))}
                </div>
                <Pagination 
                    productsPerPage={productsPerPage} 
                    totalProducts={productsAvailableList.length} 
                    paginate={setCurrentPage} 
                />
            </div>
        </div>
    );
}

export { Shop };
