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
        item.amount > 0 && item.productId && (
          <div className="card-basic-horizontal">
            <img className="cart-item-book-img" src={item.productId.image[0]} alt={item.productId.name} />
            <div id="cart-item-detail" className="card-item-details">
              <h4 id="item-title">{item.productId.name}</h4>
              <p className="item-author">- By &nbsp;{item.productId.author}</p>
              <p className="price-details">
                {item.productId.price * (1 - item.productId.discount/100 || 1)} VND&nbsp;&nbsp;
                <del>{item.productId.price} VND</del> &nbsp;&nbsp;
                <span className="discount-on-card">{item.productId.discount || 0}% off</span>
              </p>

              <div className="item-cart-quantity">
                <p className="cart-quantity-para">Quantity : &nbsp;&nbsp;</p>
                <div className="quantity-manage-container">
                  <div className="quantity-change" onClick={() => handleChangeQuantity(item.productId._id, item.amount > item.productId.quantityInStock ? item.productId.quantityInStock : item.amount, "sub", null)}>-</div>
                  <input
                    className="cart-item-quantity-input"
                    type="number"
                    min={1}
                    max={item.productId.quantityInStock}
                    value={item.amount > item.productId.quantityInStock ? item.productId.quantityInStock : item.amount}
                    autoComplete="off"
                    onChange={(e) => {
                      let newQuantity = parseInt(e.target.value, 10);
                      if (newQuantity < 1) newQuantity = 1;
                      else if (newQuantity > item.productId.quantityInStock) newQuantity = item.productId.quantityInStock;
                      handleChangeQuantity(item.productId._id, newQuantity, 'input', null);
                    }}
                  />
                  <div className="quantity-change" onClick={() => handleChangeQuantity(item.productId._id, item.amount > item.productId.quantityInStock ? item.productId.quantityInStock : item.amount, "add", null)}>+</div>
                </div>
              </div>

              <div className="cart-horizontal-card-btns card-button">
                <button className="solid-primary-btn" onClick={() => handleRemoveItem(item.productId._id, null)}>
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
      {
        item.amount > 0 && item.comboId && (
          <div className="card-basic-horizontal">
            <img className="cart-item-book-img" src={item.comboId.image[0]} alt={item.comboId.name} />
            <div id="cart-item-detail" className="card-item-details">
              <h4 id="item-title">{item.comboId.name}</h4>
              <p className="price-details">
                {item.comboId.price * (1 - item.comboId.discount/100)} VND&nbsp;&nbsp;
                <del>{item.comboId.price} VND</del> &nbsp;&nbsp;
                <span className="discount-on-card">{item.comboId.discount || 0}% off</span>
              </p>

              <div className="item-cart-quantity">
                <p className="cart-quantity-para">Quantity : &nbsp;&nbsp;</p>
                <div className="quantity-manage-container">
                  <div className="quantity-change" onClick={() => handleChangeQuantity(null, item.amount > item.comboId.quantity ? item.comboId.quantity : item.amount, "sub", item.comboId._id)}>-</div>
                  <input
                    className="cart-item-quantity-input"
                    type="number"
                    min={1}
                    max={item.comboId.quantity}
                    value={item.amount > item.comboId.quantity ? item.comboId.quantity : item.amount}
                    autoComplete="off"
                    onChange={(e) => {
                      let newQuantity = parseInt(e.target.value, 10);
                      if (newQuantity < 1) newQuantity = 1;
                      else if (newQuantity > item.comboId.quantity) newQuantity = item.comboId.quantity;
                      handleChangeQuantity(null, newQuantity, 'input', item.comboId._id);
                    }}
                  />
                  <div className="quantity-change"onClick={() => handleChangeQuantity(null, item.amount > item.comboId.quantity ? item.comboId.quantity : item.amount, "add", item.comboId._id)}>+</div>
                </div>
              </div>

              <div className="cart-horizontal-card-btns card-button">
                <button className="solid-primary-btn" onClick={() => handleRemoveItem(null, item.comboId._id)}>
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
