import React, { useState, useEffect } from 'react';
import { DataTable } from 'simple-datatables';
import OrderDetailModal from '../Category/Modal/orderDetailModel';
import Swal from 'sweetalert2';
import RefundService from '../../../../services/refund/refundService';

function RefundSale() {
  const [refund, setRefund] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  const closeModal = () => {
    setIsOrderDetailModalOpen(false);
    setSelectedOrderDetail(null);
  };

  const handleConfirmRefund = async (refundId) => {
    try {
      await RefundService.confirmRefund(refundId);
      Swal.fire({
        title: 'Success',
        text: 'Refund confirmed successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(async () => {
        const response = await RefundService.getAllRefunds();
        setRefund(response);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRestock = async (refundId, orderId) => {
    try {
      await RefundService.restockRefund(refundId, orderId);
      Swal.fire({
        title: 'Success',
        text: 'Refund restocked successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(async () => {
        const response = await RefundService.getAllRefunds();
        setRefund(response);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await RefundService.getAllRefunds();
        setRefund(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (refund.length > 0 && !loading) {
      const datatables = document.querySelectorAll('.datatable');
      datatables.forEach(datatable => {
        if (datatable.DataTable) {
          datatable.DataTable().destroy();
        }
        new DataTable(datatable, {
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
          const selectedRefund = refund[rowIndex];
          if (target.classList.contains('btn-success')) {
            handleConfirmRefund(selectedRefund._id);
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
                  await RefundService.rejectRefund(selectedRefund._id);
                  Swal.fire({
                    title: 'Success',
                    text: 'Refund canceled successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                  }).then(async () => {
                    const response = await RefundService.getAllRefunds();
                    setRefund(response);
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
          } else if (target.classList.contains('btn-warning')) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Do you want to restock this refund?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  await handleRestock(selectedRefund._id, selectedRefund.orderId);
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
  }, [refund, loading]);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h2>Refunds</h2>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <table className="table datatable text-center align-middle">
                  <thead>
                    <tr>
                      <th className="text-center align-middle">ID</th>
                      <th className="text-center align-middle">Reason</th>
                      <th className="text-center align-middle">Order ID</th>
                      <th className="text-center align-middle">Refund Date</th>
                      <th className="text-center align-middle">Status</th>
                      <th className="text-center align-middle">Image</th>
                      <th className="text-center align-middle">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refund.map((refund, index) => (
                      <tr key={refund._id} data-index={index}>
                        <td>{refund._id}</td>
                        <td>{refund.reason}</td>
                        <td>{refund.orderId}</td> {/* Assuming orderId also has a similar structure */}
                        <td>{new Date(refund.createdAt).toLocaleDateString()}</td>
                        <td>{refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}</td>
                        <td>
                          {refund.image && refund.image.length > 0 && (
                            <img
                              src={refund.image[0]}
                              alt="Refund"
                              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                          )}
                        </td>
                        <td>
                          {refund.status === 'pending' ? (
                            <>
                              <button className="btn btn-success btn-sm mr-3">Confirm</button>
                              <button className="btn btn-danger btn-sm">Reject</button>
                            </>
                          ) : refund.status !== 'refund success' ? (
                            <button className="btn btn-warning btn-sm">Re-stock</button>
                          ) : null}
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
    </main>
  );
}

export default RefundSale;
