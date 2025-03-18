import React from 'react';

function OrderDetailModal({ orderDetail, isOpen, onClose }) {
  if (!orderDetail) return null;

  const {
    _id,
    totalPrice,
    receiver_name,
    receiver_phone,
    receiver_address,
    receiver_ward_name,
    receiver_district_name,
    receiver_province_name,
    createDate,
    delivery_code,
    OrderDetail
  } = orderDetail;

  return (
    <div>
      <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.5)' : '', width: 'auto', height: 'auto' }}>
        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Detail</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h6>Order Information</h6>
              <ul className="list-group">
                <li className="list-group-item"><strong>Order ID: </strong> {_id}</li>
                <li className="list-group-item"><strong>Name: </strong> {receiver_name}</li>
                <li className="list-group-item"><strong>Phone: </strong> {receiver_phone}</li>
                <li className="list-group-item"><strong>Address: </strong> {receiver_address}, {receiver_ward_name}, {receiver_district_name}, {receiver_province_name}</li>
                <li className="list-group-item"><strong>Total price: </strong>{totalPrice?.$numberDecimal} VND</li>
                <li className="list-group-item"><strong>Create Date: </strong> {new Date(createDate).toLocaleString()}</li>
                <li className="list-group-item"><strong>Delivery Code: </strong> {delivery_code}</li>
              </ul>

              <h6 className="mt-4">Product Information</h6>
              {OrderDetail.map((detail) => {
                const { _id: detailId, amount, price, productInfo, comboInfo } = detail;
                const info = productInfo || comboInfo; // Use productInfo if it exists, otherwise use comboInfo

                return (
                  <div key={detailId} className="mt-2 d-flex align-items-start">
                    <img src={info.image[0]} alt={info.name} className="img-fluid" style={{ width: '120px', height: 'auto', marginRight: '15px' }} />
                    <div className="product-info">
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Product Name:</strong> {info.name}</li>
                        {productInfo ? (
                          <>
                            <li className="list-group-item"><strong>ISBN:</strong> {productInfo.isbn}</li>
                            <li className="list-group-item"><strong>Price:</strong> {productInfo.price}</li>
                            <li className="list-group-item"><strong>Amount:</strong> {amount}</li>
                            <li className="list-group-item"><strong>Quantity In Stock:</strong> {productInfo.quantityInStock}</li>
                            <li className="list-group-item"><strong>Sold:</strong> {productInfo.sold}</li>
                            <li className="list-group-item"><strong>Status:</strong> {productInfo.status}</li>
                          </>
                        ) : (
                          <>
                            <li className="list-group-item"><strong>Price:</strong> {comboInfo.price}</li>
                            <li className="list-group-item"><strong>Discount:</strong> {comboInfo.discount}%</li>
                            <li className="list-group-item"><strong>Quantity:</strong> {comboInfo.quantity}</li>
                            <li className="list-group-item"><strong>Status:</strong> {comboInfo.status}</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
