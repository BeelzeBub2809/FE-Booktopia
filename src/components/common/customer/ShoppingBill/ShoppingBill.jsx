import "./ShoppingBill.css";
import React from "react";
import Select from 'react-select';
import { useEffect } from "react";
import Swal from "sweetalert2";
function ShoppingBill({ cartItems }) {
  const [paymentMethod, setPaymentMethod] = React.useState("cod");
  const [deliveryCharges, setDeliveryCharges] = React.useState(0);
  const finalBillBeforeDiscount =
    cartItems.reduce((total, cartItem) => {
      return total + cartItem.productId.price * (cartItem.amount > cartItem.productId.quantityInStock ? cartItem.productId.quantityInStock : cartItem.amount);
    }, 0)

  let finalBill = 0;
  const totalDiscount = finalBillBeforeDiscount > 500000 ? 0.2 : 0;
  const discount = Math.min(finalBillBeforeDiscount * totalDiscount, 100000);
  finalBill = finalBillBeforeDiscount - discount + deliveryCharges;


  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);

  const [selectedProvince, setSelectedProvince] = React.useState(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState(null);
  const [detailAddress, setDetailAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const formattedProducts = cartItems.map(item => ({
    productId: item.productId._id,
    quantity: item.amount > item.productId.quantityInStock ? item.productId.quantityInStock.toString() : item.amount.toString(),
    total_price: (item.productId.price * (item.amount > item.productId.quantityInStock ? item.productId.quantityInStock : item.amount)),
    type: 'single'
  }));


  const isFormComplete = selectedProvince && selectedDistrict && selectedWard && detailAddress && phone && fullName;
  const handlePreviewOrder = async () => {
    const requestData = {
      products: formattedProducts,
      receiver_name: fullName,
      receiver_phone: phone,
      receiver_address: detailAddress,
      receiver_ward_name: selectedWard ? selectedWard.label : '',
      receiver_district_name: selectedDistrict ? selectedDistrict.label : '',
      receiver_province_name: selectedProvince ? selectedProvince.label : '',
      payment_type_id: 2,
    };
    try {
      const response = await fetch('http://localhost:9999/api/order/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setDeliveryCharges(result.data.total_fee);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Preview Failed',
        text: `Failed to preview order: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    if (isFormComplete) {
      handlePreviewOrder();
    }
  }, [isFormComplete]);

  const handleCreateOrder = async () => {
    const requestData = {
      userId: JSON.parse(localStorage.getItem('userId')),
      products: formattedProducts,
      receiver_name: fullName,
      receiver_phone: phone,
      receiver_address: detailAddress,
      receiver_ward_name: selectedWard ? selectedWard.label : '',
      receiver_district_name: selectedDistrict ? selectedDistrict.label : '',
      receiver_province_name: selectedProvince ? selectedProvince.label : '',
      payment_type_id: 2,
      total_price: finalBill,
      total_discount: totalDiscount,
    };
    if (!isFormComplete) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields',
      });
    } else {
      const apiUrl = paymentMethod === "cod"
        ? 'http://localhost:9999/api/order'
        : 'http://localhost:9999/api/payment/create-payment-link';
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to place order');
        }
        const data = await response.json()
        if (data && data.payUrl) {
          window.location.href = data.payUrl
        }
        Swal.fire({
          icon: 'success',
          title: 'Place order successful',
          text: 'Your order was placed successfully!',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/orders';
          }
        });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Order Failed',
          text: error.message || 'Something went wrong. Please try again.',
          confirmButtonText: 'OK'
        });
      }

    }

  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data.map(province => ({ value: province.code, label: province.name })))
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      try {
        fetch(`https://provinces.open-api.vn/api/p/${selectedProvince.value}?depth=2`)
          .then((response) => response.json())
          .then((data) => setDistricts(data.districts.map(district => ({ value: district.code, label: district.name }))));
        setSelectedDistrict(null); // Clear district and ward when province changes
        setSelectedWard(null);
        setWards([]);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      try {
        fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.value}?depth=2`)
          .then((response) => response.json())
          .then((data) => setWards(data.wards.map(ward => ({ value: ward.code, label: ward.name }))));
        setSelectedWard(null); // Clear ward when district changes
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
  }, [selectedDistrict]);

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
              <p>X {cartItem.amount > cartItem.productId.quantityInStock ? cartItem.productId.quantityInStock : cartItem.amount}</p>
            </div>
            <div className="cart-item-total-price" id="price-sum">
              <p>{cartItem.productId.price * (cartItem.amount > cartItem.productId.quantityInStock ? cartItem.productId.quantityInStock : cartItem.amount)} VND</p>
            </div>
          </div>
        );
      })}

      <div className="address-container">
        <div className="address-component">
          <p>Choose province</p>
          <Select
            value={selectedProvince}
            placeholder="Choose province"
            onChange={setSelectedProvince}
            options={provinces}
          />
        </div>

        <div className="address-component">
          <p>Choose district</p>
          <Select
            value={selectedDistrict}
            onChange={setSelectedDistrict}
            options={districts}
            placeholder="Select District"
            isDisabled={!selectedProvince} // Disable if province is not selected
          />
        </div>

        <div className="address-component">
          <p>Choose ward</p>
          <Select
            value={selectedWard}
            onChange={setSelectedWard}
            options={wards}
            placeholder="Select Ward"
            isDisabled={!selectedDistrict} // Disable if district is not selected
          />
        </div>

        <div className="address-component">
          <p>Detail address</p>
          <input
            className="form-control"
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            style={{ minHeight: "38px" }}
          />
        </div>
        <div className="address-component">
          <p>Phone</p>
          <input
            className="form-control"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ minHeight: "38px" }}
          />
        </div>

        <div className="address-component">
          <p>Full name</p>
          <input
            className="form-control"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ minHeight: "38px" }}
          />
        </div>
        <div className="form-check" style={{ fontSize: "large" }}>
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <label className="form-check-label">
            COD
          </label>
        </div>
        <div className="form-check" style={{ fontSize: "large" }}>
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            value="internetBanking"
            checked={paymentMethod === "internetBanking"}
            onChange={() => setPaymentMethod("internetBanking")}
          />
          <label className="form-check-label">
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

      <button className="place-order-btn solid-secondary-btn" onClick={handleCreateOrder}>
        Place Order
      </button>
    </div>
  );
}

export { ShoppingBill };
