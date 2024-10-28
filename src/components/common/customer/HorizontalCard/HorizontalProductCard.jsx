import "./HorizontalProductCard.css";
import React from "react";
import Swal from "sweetalert2";

function HorizontalProductCard({ item, handleRemoveItem, handleChangeQuantity }) {
  const [isCheckout, setIsCheckout] = React.useState(false);

  const handleChooseToCheckout = () => {
    setIsCheckout(!isCheckout);
  }
  return (
    <>
      {
        item.amount > 0 && (
          <div className="card-basic-horizontal">
            <img className="cart-item-book-img" src={item.productId.image} alt={item.productId.name}/>
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
                  <div className="quantity-change" onClick={() => handleChangeQuantity(item.productId._id, item.amount, "sub")}>-</div>
                  <input
                    className="cart-item-quantity-input"
                    type="text"
                    value={item.amount}
                    maxLength="3"
                    autoComplete="off"
                    readOnly
                  />
                  <div className="quantity-change" onClick={() => handleChangeQuantity(item.productId._id, item.amount, "add")}>+</div>
                </div>
              </div>

              <div className="cart-horizontal-card-btns card-button">
                <button className="solid-primary-btn" onClick={() => handleRemoveItem(item.productId._id)}>
                  Remove from Cart
                </button>
                {/* <button className={isCheckout ? "btn btn-success": "outline-primary-btn"} onClick={handleChooseToCheckout}>
                  Choose to checkout
                </button> */}
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
