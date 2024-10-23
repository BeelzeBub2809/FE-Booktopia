import "./ShoppingBill.css";
import React from "react";

function ShoppingBill({cartItems}) {
  console.log(cartItems);
  
  // Dữ liệu tĩnh cho giỏ hàng
  const userCart = [
    {
      _id: "1",
      bookName: "50 Shades of Grey",
      quantity: 2,
      discountedPrice: 360,
    },
    {
      _id: "2",
      bookName: "The Great Gatsby",
      quantity: 1,
      discountedPrice: 300,
    },
  ];

  const totalDiscount = 50; // Giả sử có một khoản giảm giá cố định
  const deliveryCharges = 50; // Phí vận chuyển cố định
  const finalBill =
    userCart.reduce((total, product) => {
      return total + product.discountedPrice * product.quantity;
    }, 0) - totalDiscount + deliveryCharges;

  const couponName = ""; // Giả sử không có coupon nào được áp dụng

  return (
    <div className="cart-bill">
      <h2 className="bill-heading">Bill Details</h2>

      <hr />
      {cartItems.map((cartItem) => {
        return (
          <div key={cartItem.productId._id} className="cart-price-container">
            <div className="cart-item-bookname">
              <p>{cartItem.productId.name}</p>
            </div>
            <div className="cart-item-quantity">
              <p>X {cartItem.amount}</p>
            </div>
            <div className="cart-item-total-price" id="price-sum">
              <p>{cartItem.productId.price * cartItem.amount} VND</p>
            </div>
          </div>
        );
      })}

      <hr />

      <div className="cart-discount-container">
        <div className="cart-item-total-discount">
          <p>Discount</p>
        </div>
        <div className="cart-item-total-discount-amount" id="price-sum">
          <p>&#8377; {totalDiscount}</p>
        </div>
      </div>

      <div className="cart-delivery-charges-container">
        <div className="cart-item-total-delivery-charges">
          <p>Delivery Charges</p>
        </div>
        <div className="cart-item-total-delivery-charges-amount" id="price-sum">
          <p id="delivery-charges">&#8377; {deliveryCharges}</p>
        </div>
      </div>

      <hr />

      <div className="cart-total-charges-container">
        <div className="cart-item-total-delivery-charges">
          <p>
            <b>Total Charges</b>
          </p>
        </div>
        <div className="cart-item-total-delivery-charges-amount" id="price-sum">
          <p id="total-charges">
            <b>&#8377; {finalBill}</b>
          </p>
        </div>
      </div>

      <hr />

      <div className="apply-coupon-container">
        <p>Apply Coupon</p>
        <input
          value={couponName}
          placeholder="Try BOOKS200"
          readOnly
        ></input>
      </div>

      <button className="place-order-btn solid-secondary-btn">
        Place Order
      </button>
    </div>
  );
}

export { ShoppingBill };
