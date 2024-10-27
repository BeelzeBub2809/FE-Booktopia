import "./ShoppingBill.css";
import React from "react";
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function ShoppingBill({ cartItems }) {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const deliveryCharges = 50000;
  const finalBillBeforeDiscount =
    cartItems.reduce((total, cartItem) => {
      return total + cartItem.productId.price * cartItem.amount;
    }, 0)

  let finalBill = 0;
  const totalDiscount = finalBillBeforeDiscount > 500000 ? 0.2 : 0;
  const discount = Math.min(finalBillBeforeDiscount * totalDiscount, 100000);
  finalBill = finalBillBeforeDiscount - discount + deliveryCharges;
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

      <div className="address-container">
        <div className="address-component">
          <p>Choose province</p>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>

        <div className="address-component">
          <p>Choose district</p>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>

        <div className="address-component">
          <p>Choose ward</p>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="address-component">
          <p>Detail address</p>
          <input className="form-control" type="text" style={{ minHeight: "38px" }} />
        </div>
        <div className="address-component">
          <p>Phone</p>
          <input className="form-control" type="text" style={{ minHeight: "38px" }} />
        </div>
        <div className="address-component">
          <p>Full name</p>
          <input className="form-control" type="text" style={{ minHeight: "38px" }} />
        </div>
        <div class="form-check" style={{fontSize: "large"}}>
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
              COD
            </label>
        </div>
        <div class="form-check" style={{fontSize: "large"}}>
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
            <label class="form-check-label" for="flexRadioDefault2">
              Internet Banking
            </label>
        </div>
      </div>


      <hr />

      <div className="cart-discount-container">
        <div className="cart-item-total-discount">
          <p>Discount</p>
        </div>
        <div className="cart-item-total-discount-amount" id="price-sum">
          <p>{totalDiscount * 100}%</p>
        </div>
      </div>

      <div className="cart-delivery-charges-container">
        <div className="cart-item-total-delivery-charges">
          <p>Delivery Charges</p>
        </div>
        <div className="cart-item-total-delivery-charges-amount" id="price-sum">
          <p id="delivery-charges">{deliveryCharges} VND</p>
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
            <b>{finalBill} VND</b>
          </p>
        </div>
      </div>

      <hr />

      <div className="apply-coupon-container">
        <p>Orders over 500K get a 20% discount, up to 100K.</p>
      </div>

      <button className="place-order-btn solid-secondary-btn">
        Place Order
      </button>
    </div>
  );
}

export { ShoppingBill };
