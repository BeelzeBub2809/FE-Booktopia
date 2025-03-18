import Swal from 'sweetalert2';
import OrderServices from '../../../../services/order/orderServices';
import './orders.css';
import React, { useEffect, useState } from 'react';
import RefundModal from './Modal/refundModal';

function OrderCustomer() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderServices.getOrderHistoryByUserId();
        console.log(data);

        setOrders(data);
        setFilteredOrders(data); // Set initial filtered orders to all orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const openAddProductModal = () => {
    setIsRefundModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsRefundModalOpen(false);
  };


  const handleCancelOrder = async (orderId) => {
    try {
      await OrderServices.cancelOnConfirmOrder(orderId);
      Swal.fire({
        title: 'Success',
        text: 'Order canceled successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(async () => {
        const response = await OrderServices.getOrderHistoryByUserId();
        setOrders(response);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Filtering function
  const filterOrders = (filter) => {
    switch (filter) {
      case "All":
        return orders;
      case "Order Verification":
        return orders.filter(order => order.status === 'confirming');
      case "Delivering":
        return orders.filter(order => [
          "ready_to_pick", "picking", "money_collect_picking", "picked", "storing",
          "transporting", "sorting", "delivering", "money_collect_delivering"
        ].includes(order.status));
      case "Completed":
        return orders.filter(order => order.status === "delivered");
      case "Canceled":
        return orders.filter(order => ["cancel", "delivered", "delivery_fail"].includes(order.status));
      case "Refund":
        return orders.filter(order => [
          "waiting_to_return", "return", "return_transporting", "return_sorting",
          "returning", "return_fail", "returned", "refund"
        ].includes(order.status));
      default:
        return orders;
    }
  };

  // Handle filter change and update filtered orders
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setFilteredOrders(filterOrders(newFilter));
  };

  return (
    <section className="order-list-customer">
      <div className="order-container">
        <div className="status-bar row">
          <div onClick={() => handleFilterChange("All")} className={`status-item col ${filter === "All" ? "active" : ""}`}>All</div>
          <div onClick={() => handleFilterChange("Order Verification")} className={`status-item col ${filter === "Order Verification" ? "active" : ""}`}>Order Verification</div>
          <div onClick={() => handleFilterChange("Delivering")} className={`status-item col ${filter === "Delivering" ? "active" : ""}`}>Delivering</div>
          <div onClick={() => handleFilterChange("Completed")} className={`status-item col ${filter === "Completed" ? "active" : ""}`}>Completed</div>
          <div onClick={() => handleFilterChange("Canceled")} className={`status-item col ${filter === "Canceled" ? "active" : ""}`}>Canceled</div>
          <div onClick={() => handleFilterChange("Refund")} className={`status-item col ${filter === "Refund" ? "active" : ""}`}>Refund</div>
        </div>
        <form className="search-bar">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f760b4ae4f6ad618214f5c519690ff5856d4d121a7974d0f8ec787856fadc17?placeholderIfAbsent=true&apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd" alt="" className="search-icon" />
          <input type="text" placeholder="Search by Product name" className="search-input" aria-label="Search by Product name" />
        </form>
        {filteredOrders.map((order) => (
          <>
            <article key={order._id} className="order-section">
              <header className="order-header">
                <p className="order-date">Order Date: {new Date(order.createDate).toLocaleDateString()}</p>
                <p className="order-status">Status: {order.status}</p>
                <hr className="divider" />
                <p className="receiver-name">Receiver: {order.receiver_name}</p>
                <p className="receiver-phone">Phone: {order.receiver_phone}</p>
                <p className="receiver-address">Address: {order.receiver_address}, {order.receiver_ward_name}, {order.receiver_district_name}, {order.receiver_province_name}</p>
              </header>
              <hr className="divider" />
              {order.OrderDetail.map((item) => (
                item.productInfo ? (
                  <div key={item._id} className="order-details">
                    <img src={item.productInfo.image[0]} alt={item.productInfo.name} className="product-image" />
                    <div className="product-info">
                      <h2 className="product-name">{item.productInfo.name}</h2>
                      <div className="product-details">
                        <p className="quantity">Quantity: {item.amount}</p>
                        <div className="price-info">
                          <p>Price: {item.productInfo.price} VND</p>
                          <p className="discount">Discount: {item.productInfo.discount || 0}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={item._id} className="order-details">
                    <img src={item.comboInfo.image[0]} alt={item.comboInfo.name} className="product-image" />
                    <div className="product-info">
                      <h2 className="product-name">{item.comboInfo.name}</h2>
                      <div className="product-details">
                        <p className="quantity">Quantity: {item.amount}</p>
                        <div className="price-info">
                          <p>Price: {item.comboInfo.price} VND</p>
                          <p className="discount">Discount: {item.comboInfo.discount || 0}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
              <hr className="divider" />
              <footer className="order-summary">
                <p className="order-discount">Order discount: {order.discount || 0}%</p>
                <p className="total-price">Total: {order.totalPrice?.$numberDecimal || 0} VND</p>
                <div className="order-actions">
                  {order.status === "delivered" && (
                    <button className="btn btn-track" onClick={openAddProductModal}>Refund Order</button>
                  )}
                  {order.status === "confirming" && (
                    <button className="btn btn-cancel" onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
                  )}
                </div>
              </footer>
            </article>
            <RefundModal showModal={isRefundModalOpen} handleCloseModal={closeAddProductModal} orderId={order._id} />
          </>
        ))}
      </div>

    </section>
  );
}

export default OrderCustomer;
