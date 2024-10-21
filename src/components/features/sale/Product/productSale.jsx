import React, { useState, useEffect } from 'react';
import './productSale.css';
import { DataTable } from 'simple-datatables';
import AddProductModal from '../Modal/addProductModal';

function ProductSale() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const products = [
    { name: 'Unity Pugh', ext: '9958', city: 'Curico', startDate: '2005/02/11', completion: '37%' },
    { name: 'Theodore Duran', ext: '8971', city: 'Dhanbad', startDate: '1999/04/07', completion: '97%' },
    { name: 'Kylie Bishop', ext: '3147', city: 'Norman', startDate: '2005/09/08', completion: '63%' },
    { name: 'Willow Gilliam', ext: '3497', city: 'Amqui', startDate: '2009/29/11', completion: '30%' },
    { name: 'Blossom Dickerson', ext: '5018', city: 'Kempten', startDate: '2006/11/09', completion: '17%' },
    { name: 'Karyn Byers', ext: '7741', city: 'Bathurst', startDate: '2006/04/25', completion: '26%' },
    { name: 'Buffy Russell', ext: '3362', city: 'Bathurst', startDate: '2006/04/25', completion: '26%' },
    { name: 'Buffy Russell', ext: '3362', city: 'Bathurst', startDate: '2006/04/25', completion: '26%' },
    { name: 'Buffy Russell', ext: '3362', city: 'Bathurst', startDate: '2006/04/25', completion: '26%' },
    { name: 'Buffy Russell', ext: '3362', city: 'Bathurst', startDate: '2006/04/25', completion: '26%' },
    { name: 'Buffy Russell', ext: '3362', city: 'Bathurst', startDate: '2006/04/25', completion: '26%' },
  ];

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

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h2>Data Tables</h2>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={openAddProductModal}>Add Product</button>
                
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Ext.</th>
                      <th>City</th>
                      <th>Start Date</th>
                      <th>Completion</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.ext}</td>
                        <td>{product.city}</td>
                        <td>{product.startDate}</td>
                        <td>{product.completion}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2">Edit</button>
                          <button className="btn btn-danger btn-sm">Inactive</button>
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
      <AddProductModal showModal={isAddProductModalOpen} handleCloseModal={closeAddProductModal}/>
    </main>
  );
}

export default ProductSale;
