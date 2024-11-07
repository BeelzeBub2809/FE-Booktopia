import React, { useState, useEffect } from 'react';
import './discountSale.css';
import { DataTable } from 'simple-datatables';
import AddDiscountModal from './Modal/addDiscountModal';
import EditDiscountModal from './Modal/editDiscountModal';
import LoadingLottie from '../../../../Assets/Lottie/loading-0.json'
import Lottie from "react-lottie";
import Swal from 'sweetalert2';
export const IMAGE_DEFAULT = 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';
function DiscountSale() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedItem, setSelectedItem] = useState(null);

  const loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    fetch("http://localhost:9999/api/discount")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0 && !loading) {
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
            {
              select: 0,
              sortSequence: ["desc", "asc"]
            },
            {
              select: 1,
              sortSequence: ["desc", "asc"]
            }
          ]
        });
        datatable.addEventListener('click', (e) => {
          const target = e.target;
          const row = target.closest('tr');
          const rowIndex = row ? row.getAttribute('data-index') : null;
          const selectedCategory = data[rowIndex];
          if (target.classList.contains('btn-warning')) {
            setSelectedItem(selectedCategory);
            setShowEditModal(true);
          }
        });
      });
    }
  }, [data, loading]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h2>Manage Discount</h2>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={openAddModal}>Add Discount</button>
                {loading ? (
                  <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
                ) : (
                  <table className="table datatable text-center align-middle">
                    <thead>
                      <tr>
                        <th className='text-center align-middle'>Image</th>
                        <th className='text-center align-middle'>Product Name</th>
                        <th className='text-center align-middle'>Discount</th>
                        <th className='text-center align-middle'>Min Order Price</th>
                        <th className='text-center align-middle'>Max Order Price</th>
                        <th className='text-center align-middle'>Start Date</th>
                        <th className='text-center align-middle'>End Date</th>
                        <th className='text-center align-middle'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      data?.map((p, index) => (
                        <tr key={index}>
                          <td> 
                            {p.productId.image && p.productId.image.length > 0 ? (
                              <img src={p.productId.image[0]} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            ) : (
                              <img src={IMAGE_DEFAULT} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            )}
                          </td>
                          <td>{p.productId.name}</td>
                          <td>{p.discount}</td>
                          <td>{p.minOrderPrice}</td>
                          <td>{p.maxOrderPrice}</td>
                          <td>{formatDate(p.startDate)}</td>
                          <td>{formatDate(p.endDate)}</td>
                          <td>
                              <button className="btn btn-warning btn-sm me-2" onClick={() => { setSelectedItem(p); setShowEditModal(true) }}>Edit</button>
                          </td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddDiscountModal showModal={showAddModal} handleCloseModal={closeAddModal} />
      <EditDiscountModal showModal={showEditModal} handleCloseModal={handleCloseEditModal} item={selectedItem} />
    </main>
  );
}

export default DiscountSale;
