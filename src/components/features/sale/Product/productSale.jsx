import React, { useState, useEffect } from 'react';
import './productSale.css';
import { DataTable } from 'simple-datatables';
import AddProductModal from '../Modal/addProductModal';
import EditProductModal from '../Modal/editProductModal';
import LoadingLottie from '../../../../Assets/Lottie/loading-0.json'
import Lottie from "react-lottie"; 

function ProductSale() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
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
    const datatables = document.querySelectorAll('.datatable');
    if (datatables.length > 0) {
      datatables.forEach(datatable => {
        const dataTable = new DataTable(datatable, {
          perPageSelect: [10, 15, ["All", -1]],
          perPage: 10,
          columns: [
            {
              select: 0,
              sortSequence: ["desc", "asc"]
            },
            {
              select: 1,
              sortSequence: ["desc"]
            },
            {
              select: 4,
              cellClass: "green",
              headerClass: "red"
            }
          ]
        });
      });
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/api/product/all", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
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


  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
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
                    </tr>
                  </thead>
                  <tbody>
                   {
                    data.map((p, index) => (
                        <tr key={index}>
                          <td>{p.isbn}</td>
                          <td>{p.name}</td>
                          <td>{p.quantityInStock}</td>
                          <td>{p.publisher}</td>
                          <td>{p.status}</td>
                          <td>
                            <button className="btn btn-warning btn-sm me-2" onClick={()=>{ setSelectedItem(p); setShowEditModal(true)}}>Edit</button>
                            <button className="btn btn-danger btn-sm">Inactive</button>
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
      {/* <EditProductModal showModal={showEditModal} handleCloseModal={handleCloseEditModal} item={selectedItem}/> */}
    </main>
  );
}

export default ProductSale;
