import React, { useState, useEffect } from 'react';
import { DataTable } from 'simple-datatables';
import OrderServices from '../../../../services/order/orderServices';
import OrderDetailModal from '../Category/Modal/orderDetailModel';
import Swal from 'sweetalert2';

function OrderSale() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  const handleViewDetailClick = (orderDetail) => {
    setSelectedOrderDetail(orderDetail);
    setIsOrderDetailModalOpen(true);
  };

  const closeModal = () => {
    setIsOrderDetailModalOpen(false);
    setSelectedOrderDetail(null);
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      await OrderServices.confirmOrder(orderId);
      Swal.fire({
        title: 'Success',
        text: 'Order confirmed successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(async () => {
        const response = await OrderServices.getAllOrder();
        setOrders(response);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderServices.getAllOrder();
        console.log(response);

        setOrders(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && !loading) {
      const datatables = document.querySelectorAll('.datatable');
      datatables.forEach(datatable => {
        if (datatable.DataTable) {
          datatable.DataTable().destroy();
        }
        const dataTableInstance = new DataTable(datatable, {
          perPageSelect: [10, 15, ["All", -1]],
          searchable: true,
          paging: true,
          perPage: 10,
          columns: [
            { select: 0, sortSequence: ["desc", "asc"] },
            { select: 1, sortSequence: ["desc"] },
          ]
        });

        datatable.addEventListener('click', (e) => {
          const target = e.target;
          const row = target.closest('tr');
          const rowIndex = row ? row.getAttribute('data-index') : null;
          const selectedOrder = orders[rowIndex];
          if (target.classList.contains('btn-primary')) {
            handleViewDetailClick(selectedOrder);
          } else if (target.classList.contains('btn-success')) {
            handleConfirmOrder(selectedOrder._id);
          } else if (target.classList.contains('btn-danger')) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Do you want to cancel this order?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  if (selectedOrder.status === 'confirming') {
                    await OrderServices.cancelOnConfirmOrder(selectedOrder._id);
                  } else {
                  await OrderServices.cancelOrder(selectedOrder._id);
                  }
                  Swal.fire({
                    title: 'Success',
                    text: 'Order canceled successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                  }).then(async () => {
                    const response = await OrderServices.getAllOrder();
                    setOrders(response);
                  });
                } catch (error) {
                  Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                  });
                }
              }
            });
          }
        });
      });
    }
  }, [orders, loading]);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h2>Manage Order</h2>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <table className="table datatable text-center align-middle">
                  <thead>
                    <tr>
                      <th className='text-center align-middle'>Name</th>
                      <th className='text-center align-middle'>Phone</th>
                      <th className='text-center align-middle'>Address</th>
                      <th className='text-center align-middle'>Order date</th>
                      <th className='text-center align-middle'>Delivery Code</th>
                      <th className='text-center align-middle'>Status</th>
                      <th className='text-center align-middle'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index} data-index={index}>
                        <td>{order.receiver_name}</td>
                        <td>{order.receiver_phone}</td>
                        <td>{order.receiver_address}, {order.receiver_ward_name}, {order.receiver_district_name}, {order.receiver_province_name}</td>
                        <td>{new Date(order.createDate).toLocaleDateString()}</td>
                        <td>{order.delivery_code || ""}</td>
                        <td>{order.status}</td>
                        <td>
                          {order.status === 'confirming' && (
                            <>
                              <button className="btn btn-success btn-sm mr-3">Confirm</button>
                              <button className="btn btn-danger btn-sm mr-3">Cancel</button>
                              <button className="btn btn-primary btn-sm">View Detail</button>
                            </>
                          )}

                          {order.status !== 'confirming' &&
                            (order.status === 'ready_to_pick' ||
                              order.status === 'picking' ||
                              order.status === 'money_collect_picking') && (
                              <>
                                <button className="btn btn-danger btn-sm mr-3">Cancel</button>
                                <button className="btn btn-primary btn-sm">View Detail</button>
                              </>
                            )}

                          {order.status !== 'confirming' &&
                            order.status !== 'ready_to_pick' &&
                            order.status !== 'picking' &&
                            order.status !== 'money_collect_picking' && (
                              <button className="btn btn-primary btn-sm">View Detail</button>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderDetailModal
        orderDetail={selectedOrderDetail}
        isOpen={isOrderDetailModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}

export default OrderSale;
