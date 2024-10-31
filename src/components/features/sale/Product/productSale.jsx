import React, { useState, useEffect } from 'react';
import './productSale.css';
import { DataTable } from 'simple-datatables';
import AddProductModal from './Modal/addProductModal';
import EditProductModal from './Modal/editProductModal';
import LoadingLottie from '../../../../Assets/Lottie/loading-0.json'
import Lottie from "react-lottie"; 
import ProductService from '../../../../services/product/productService';
import Swal from 'sweetalert2';

function ProductSale() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
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
    fetch("http://localhost:9999/api/product", {
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
            const selectedProduct = data[rowIndex];

            if (target.classList.contains('btn-warning')) {
              setSelectedItem(selectedProduct);
              setShowEditModal(true);
            } else if (target.classList.contains('btn-success') || target.classList.contains('btn-danger')) {
              handleChangeActive(selectedProduct._id, selectedProduct.status);
            }
          });
        });
      }
    }
  }, [data, loading]);
  

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  }

  const handleChangeActive = async (id, status) => {
    try {
      const res = await ProductService.updateProduct({_id:id, status: status === 'active' ? 'inactive' : 'active'});
      
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
        <h2>Manage Product</h2>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={openAddProductModal}>Add Product</button>
                { loading ? (
                  <Lottie options={loadingObj} height={100} width={100} /> // Show Lottie animation while loading
                ) : (
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>ISBN</th>
                      <th>Name</th>
                      <th>Quantity In Stock</th>
                      <th>Publisher</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                   {
                    data?.map((p, index) => (
                        <tr key={p._id} data-index={index}> {/* Add data-index to track the row */}
                          <td>{p.isbn}</td>
                          <td>{p.name}</td>
                          <td>{p.quantityInStock}</td>
                          <td>{p.publisher}</td>
                          <td>{p.status}</td>
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
      <AddProductModal showModal={isAddProductModalOpen} handleCloseModal={closeAddProductModal}/>
      <EditProductModal showModal={showEditModal} handleCloseModal={handleCloseEditModal} item={selectedItem}/>
    </main>
  );
}

export default ProductSale;
