import React from 'react';
import "./Wishlist.css";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import HeartLottie from "../../../../Assets/Icons/heart.json";
import { WishlistProductCard } from "../Index/index.js";

function Wishlist() {
    // Dữ liệu tĩnh cho wishlist
    const userWishlist = [
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

    let heartObj = {
        loop: true,
        autoplay: true,
        animationData: HeartLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="wishlist-container">
            <h2>{userWishlist.length} {userWishlist.length === 1 ? "item" : "items"} in Wishlist</h2>
            <div className="products-card-grid">
                {
                    userWishlist.length > 0 ? (
                        userWishlist.map(productdetails => (
                            <WishlistProductCard key={productdetails._id} productdetails={productdetails} />
                        ))
                    ) : (
                        <div className="empty-wishlist-message-container">
                            <Lottie options={heartObj}
                                height={150}
                                width={150}
                                isStopped={false}
                                isPaused={false}
                            />
                            <h2>Your wishlist is empty 🙃</h2>
                            <Link to="/shop">
                                <button className="solid-primary-btn">Go to shop</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export { Wishlist };
