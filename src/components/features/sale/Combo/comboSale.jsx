import React, { useState, useEffect } from 'react';
import './comboSale.css';
import { DataTable } from 'simple-datatables';
import AddComboModal from './Modal/addComboModal';
import LoadingLottie from '../../../../Assets/Lottie/loading-0.json'
import Lottie from "react-lottie"; 
import ComboService from '../../../../services/combo/comboServices';
import Swal from 'sweetalert2';
import EditComboModal from './Modal/editComboModal';
export const IMAGE_DEFAULT = 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';
function ComboSale() {
  const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    fetch("http://localhost:9999/api/combo", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
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
      if (datatables.length > 0) {
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
              { select: 4, cellClass: "green", headerClass: "red" }
            ]
          });
          datatable.addEventListener('click', (event) => {
            const target = event.target;
            const row = target.closest('tr');
            const rowIndex = row ? row.getAttribute('data-index') : null;
            const selectedCombo = data[rowIndex];

            if (target.classList.contains('btn-warning')) {
              setSelectedItem(selectedCombo);
              setShowEditModal(true);
            } else if (target.classList.contains('btn-success') || target.classList.contains('btn-danger')) {
              handleChangeActive(selectedCombo._id, selectedCombo.status);
            }
          });
        });
      }
    }
  }, [data, loading]);

  const openAddCoomboModal = () => {
    setShowAddModal(true);
  };

  const closeAddComboModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  }

  const handleChangeActive = async (id, status) => {
    try {
      const res = await ComboService.updateCombo({_id:id, status: status === 'active' ? 'inactive' : 'active'});
      
      Swal.fire({
        title: `successfully`,
        text: res.message,
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Ok',
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  return (
     <main id="main" className="main">
      <div className="pagetitle">
        <h2>Manage Combo</h2>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={openAddCoomboModal}>Create Combo</button>
                { loading ? (
                  <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
                  ) : (
                  <table className="table datatable text-center align-middle">
                    <thead>
                      <tr>
                        <th className='text-center align-middle'>Image</th>
                        <th className='text-center align-middle'>Name</th>
                        <th className='text-center align-middle'>Quantity</th>
                        <th className='text-center align-middle'>discount</th>
                        <th className='text-center align-middle'>Price</th>
                        <th className='text-center align-middle'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data?.map((p, index) => (
                          <tr key={p._id} data-index={index}>
                            <td>
                              {p.image && p.image.length > 0 ? (
                                <img src={p.image[0]} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                              ) : (
                                <img src={IMAGE_DEFAULT} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                              )}
                            </td>
                            <td>{p.name}</td>
                            <td>{p.quantity}</td>
                            <td>{p.discount}%</td>
                            <td>{p.price} VND</td>
                            <td style={{width: '230px'}}>
                              <button className="btn btn-warning me-2">Edit</button>
                              {
                                p.status === 'active' ? (
                                  <button className="btn btn-success " style={{width:"100px"}}>Active</button>
                                ) : (
                                  <button className="btn btn-danger " style={{width:"100px"}}>Inactive</button>
                                )
                              }
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
			<AddComboModal showModal={showAddModal} handleCloseModal={closeAddComboModal}/>
      <EditComboModal showModal={showEditModal} handleCloseModal={handleCloseEditModal} item={selectedItem}/>
    </main>
  );
}

export default ComboSale;
