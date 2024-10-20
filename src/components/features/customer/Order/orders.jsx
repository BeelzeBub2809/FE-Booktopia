import './orders.css';

function OrderCustomer() {
  return (
    <section class="order-list-customer">
      <div class="order-container">
        <div class="status-bar row">
          <div class="status-item col">All</div>
          <div class="status-item col">Order Verification</div>
          <div class="status-item col">Delivering</div>
          <div class="status-item col">Completed</div>
          <div class="status-item col">Canceled</div>
          <div class="status-item col">Refund</div>
        </div>
        <form class="search-bar">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f760b4ae4f6ad618214f5c519690ff5856d4d121a7974d0f8ec787856fadc17?placeholderIfAbsent=true&apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd" alt="" class="search-icon" />
          <input type="text" placeholder="Search by Product name" class="search-input" aria-label="Search by Product name" />
        </form>
        <article class="order-section">
          <header class="order-header">
            <p class="order-date">Order Date: 12/12/2024</p>
            <p class="order-status">Success</p>
          </header>
          <hr class="divider" />
          <div class="order-details">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd5fa143090752b43fec6fa38e5c3fa7d69485cf31aaf6c39e5aff7910546239?placeholderIfAbsent=true&apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd" alt="Doremon Bản giao hưởng địa cầu" class="product-image" />
            <div class="product-info">
              <h2 class="product-name">Doremon Bản giao hưởng địa cầu</h2>
              <div class="product-details">
                <p class="quantity">Quantity: 1</p>
                <div class="price-info">
                  <p>Price: 79000</p>
                  <p class="discount">Discount: 2%</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="divider" />
          <footer class="order-summary">
            <p class="order-discount">Order discount: 20%</p>
            <p class="total-price">Total: 79000</p>
            <div class="order-actions">
              <button class="btn btn-cancel">Cancel Order</button>
              <button class="btn btn-track">Tracking Order</button>
            </div>
          </footer>
        </article>
        <article class="order-section">
          <header class="order-header">
            <p class="order-date">Order Date: 12/12/2024</p>
            <p class="order-status">Success</p>
          </header>
          <hr class="divider" />
          <div class="order-details">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd5fa143090752b43fec6fa38e5c3fa7d69485cf31aaf6c39e5aff7910546239?placeholderIfAbsent=true&apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd" alt="Doremon Bản giao hưởng địa cầu" class="product-image" />
            <div class="product-info">
              <h2 class="product-name">Doremon Bản giao hưởng địa cầu</h2>
              <div class="product-details">
                <p class="quantity">Quantity: 1</p>
                <div class="price-info">
                  <p>Price: 79000</p>
                  <p class="discount">Discount: 2%</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="divider" />
          <footer class="order-summary">
            <p class="order-discount">Order discount: 20%</p>
            <p class="total-price">Total: 79000</p>
            <div class="order-actions">
              <button class="btn btn-cancel">Cancel Order</button>
              <button class="btn btn-track">Tracking Order</button>
            </div>
          </footer>
        </article>
        <article class="order-section">
          <header class="order-header">
            <p class="order-date">Order Date: 12/12/2024</p>
            <p class="order-status">Success</p>
          </header>
          <hr class="divider" />
          <div class="order-details">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd5fa143090752b43fec6fa38e5c3fa7d69485cf31aaf6c39e5aff7910546239?placeholderIfAbsent=true&apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd" alt="Doremon Bản giao hưởng địa cầu" class="product-image" />
            <div class="product-info">
              <h2 class="product-name">Doremon Bản giao hưởng địa cầu</h2>
              <div class="product-details">
                <p class="quantity">Quantity: 1</p>
                <div class="price-info">
                  <p>Price: 79000</p>
                  <p class="discount">Discount: 2%</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="divider" />
          <footer class="order-summary">
            <p class="order-discount">Order discount: 20%</p>
            <p class="total-price">Total: 79000</p>
            <div class="order-actions">
              <button class="btn btn-cancel">Cancel Order</button>
              <button class="btn btn-track">Tracking Order</button>
            </div>
          </footer>
        </article>
      </div>
    </section>
  )
}

export default OrderCustomer;