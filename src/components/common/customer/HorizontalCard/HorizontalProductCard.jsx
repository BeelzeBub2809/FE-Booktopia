import "./HorizontalProductCard.css";
import React from "react";
import imgSrc1 from "../../../../Assets/Images/Book_Covers/Attack_On_Titan.jpg";
import Swal from "sweetalert2";
import CartService from "../../../../services/cart/cartService";


function HorizontalProductCard({ item, handleRemoveItem }) {
  // Dữ liệu tĩnh cho thẻ sản phẩm
  const bookName = "50 Shades of Grey";
  const author = "E. L. James";
  const imgSrc = "../../../../Assets/Images/Book_Covers/book1.jpg";
  const imgAlt = "50 Shades of Grey Cover";
  const discountedPrice = 360;
  const originalPrice = 450;
  const discountPercent = 20;
  const quantity = 1;




  return (
    <>
      {
        item.amount > 0 && (
          <div className="card-basic-horizontal">
            <img className="cart-item-book-img" src={item.productId.image} alt={imgAlt} />
            <div id="cart-item-detail" className="card-item-details">
              <h4 id="item-title">{item.productId.name}</h4>
              <p className="item-author">- By &nbsp;{item.productId.author}</p>
              <p className="price-details">
                {item.productId.price} VND&nbsp;&nbsp;
                <del>{item.productId.price} VND</del> &nbsp;&nbsp;
                <span className="discount-on-card">{item.productId.discountId == null ? 0 : 10}% off</span>
              </p>

              <div className="item-cart-quantity">
                <p className="cart-quantity-para">Quantity : &nbsp;&nbsp;</p>
                <div className="quantity-manage-container">
                  <div className="quantity-change">-</div>
                  <input
                    className="cart-item-quantity-input"
                    type="text"
                    value={item.amount}
                    maxLength="3"
                    autoComplete="off"
                    readOnly
                  />
                  <div className="quantity-change">+</div>
                </div>
              </div>

              <div className="cart-horizontal-card-btns card-button">
                <button className="solid-primary-btn" onClick={() => handleRemoveItem(item.productId._id)}>
                  Remove from Cart
                </button>
                <button className="outline-primary-btn">
                  Choose to checkout
                </button>
              </div>
              <div className="badge-on-card">
                {/* Badge content nếu có */}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export { HorizontalProductCard };
