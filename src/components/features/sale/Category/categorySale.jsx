import React, { useState, useEffect } from 'react';
import './categorySale.css';
import { DataTable } from 'simple-datatables';
import AddCategoryModal from './Modal/addCategoryModal';
import EditCategoryModal from './Modal/editCategoryModal';
import LoadingLottie from '../../../../Assets/Lottie/loading-0.json'
import Lottie from "react-lottie";
import Swal from 'sweetalert2';

function CategorySale() {

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
    fetch("http://localhost:9999/api/category")
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
        <h2>Manage Category</h2>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={openAddModal}>Add Category</button>
                {loading ? (
                  <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
                ) : (
                  <table className="table datatable text-center align-middle">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data?.map((p, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{p.name}</td>
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
      <AddCategoryModal showModal={showAddModal} handleCloseModal={closeAddModal} />
      <EditCategoryModal showModal={showEditModal} handleCloseModal={handleCloseEditModal} item={selectedItem} />
    </main>
  );
}

export default CategorySale;
