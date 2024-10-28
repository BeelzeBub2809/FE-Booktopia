import OrderServices from '../../../../services/order/orderServices';
import './orders.css';
import React, { useEffect, useState } from 'react';

function OrderCustomer() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await OrderServices.getOrderHistoryByUserId();
        setOrders(data);
        setFilteredOrders(data); // Set initial filtered orders to all orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Filtering function
  const filterOrders = (filter) => {
    switch (filter) {
      case "All":
        return orders;
      case "Order Verification":
        return orders.filter(order => order.status === "ready_to_pick");
      case "Delivering":
        return orders.filter(order => [
          "picking", "money_collect_picking", "picked", "storing",
          "transporting", "sorting", "delivering", "money_collect_delivering"
        ].includes(order.status));
      case "Completed":
        return orders.filter(order => order.status === "delivered");
      case "Canceled":
        return orders.filter(order => ["cancel", "delivered", "delivery_fail"].includes(order.status));
      case "Refund":
        return orders.filter(order => [
          "waiting_to_return", "return", "return_transporting", "return_sorting",
          "returning", "return_fail", "returned"
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
          <article key={order._id} className="order-section">
            <header className="order-header">
              <p className="order-date">Order Date: {new Date(order.createDate).toLocaleDateString()}</p>
              <p className="order-status">{order.status}</p>
            </header>
            <hr className="divider" />
            {order.OrderDetail.map((item) => (
              <div key={item._id} className="order-details">
                <img src={item.productInfo.image[0]} alt={item.productInfo.name} className="product-image" />
                <div className="product-info">
                  <h2 className="product-name">{item.productInfo.name}</h2>
                  <div className="product-details">
                    <p className="quantity">Quantity: {item.quantity}</p>
                    <div className="price-info">
                      <p>Price: {item.productInfo.price}</p>
                      <p className="discount">Discount: {item.productInfo.discount || 0}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <hr className="divider" />
            <footer className="order-summary">
              <p className="order-discount">Order discount: {order.discount || 0}%</p>
              <p className="total-price">Total: {order.totalPrice.$numberDecimal}</p>
              <div className="order-actions">
                <button className="btn btn-cancel">Cancel Order</button>
                <button className="btn btn-track">Tracking Order</button>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OrderCustomer;
