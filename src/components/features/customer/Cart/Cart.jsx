import "./Cart.css";
import Lottie from 'react-lottie';
import CartLottie from "../../../../Assets/Icons/cart.json";
import { Link } from "react-router-dom";
import { HorizontalProductCard } from "../../../common/customer/HorizontalCard/HorizontalProductCard"; // Sửa thành named import
import { ShoppingBill } from "../../../common/customer/ShoppingBill/ShoppingBill"; // Giả sử bạn đã định nghĩa ShoppingBill ở một file khác
import { useEffect } from "react";
import CartService from "../../../../services/cart/cartService";
import React from "react";
import Swal from "sweetalert2";
function Cart() {

    const [cartItems, setCartItems] = React.useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await CartService.getCart();
                setCartItems(cartData);
                console.log(cartData);

            } catch (error) {
                console.error(error);
            }
        }
        fetchCart();
    }, []);

    const handleRemoveItem = async (productId) => {
        try {
            const response = await CartService.removeFromCart(productId);
            Swal.fire({
                title: 'Success',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'Ok',
            });
            const fetchCart = async () => {
                try {
                    const cartData = await CartService.getCart();
                    setCartItems(cartData);
                    console.log(cartData);
    
                } catch (error) {
                    console.error(error);
                }
            }
            fetchCart();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    }

    const handleChangeQuantity = async (productId, quantity, action) => {
        try {
            if(action === 'input') {
                const response = await CartService.changeQuantity({ productId, quantity });
            } else {
                const response = await CartService.changeQuantity({ productId, quantity: quantity + (action === 'add' ? 1 : -1) });
            }
            
            const fetchCart = async () => {
                try {
                    const cartData = await CartService.getCart();
                    setCartItems(cartData);
                    console.log(cartData);
    
                } catch (error) {
                    console.error(error);
                }
            }
            fetchCart();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    }
    let cartObj = {
        loop: true,
        autoplay: true,
        animationData: CartLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="cart-content-container">
            <h2>Items in Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart-message-container">
                    <Lottie options={cartObj}
                        height={150}
                        width={150}
                        isStopped={false}
                        isPaused={false}
                    />
                    <h2>Your cart is empty 🙃</h2>
                    <Link to="/shop">
                        <button className="solid-primary-btn">Go to shop</button>
                    </Link>
                </div>
            ) : (
                <div className="cart-grid">
                    <div className="cart-items-grid">
                        {cartItems.map(item => (
                            <HorizontalProductCard item={item} handleRemoveItem={handleRemoveItem} handleChangeQuantity={handleChangeQuantity} />
                        ))}
                    </div>
                    <ShoppingBill cartItems={cartItems} />
                </div>
            )}
        </div>
    );
}

export { Cart };
