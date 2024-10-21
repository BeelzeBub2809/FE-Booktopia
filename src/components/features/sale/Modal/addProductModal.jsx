import { useState } from 'react';

export default function AddProductModal({ showModal, handleCloseModal }) {
  const [imagePreview, setImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
  const [product, setProduct] = useState({
    isbn: '',
    name: '',
    price: '',
    quantityInStock: '',
    publisher: '',
    author: '',
    categoryId: '',
    image: ''
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    // Add your logic to post the product to the database here
    console.log(product);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'flex', minHeight: '120vh', background: 'none', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
            <div className="modal-dialog modal-lg modal-dialog-centered" role='document'>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Product</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <div className='d-flex' style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={imagePreview} alt="Product" className="avatar" style={{ width: '40%' }} />
                      <div className="mt-3">
                        <label className="form-label text-dark">Upload Image</label>
                        <input type="file" className="form-control" accept="image/png, image/jpeg" onChange={handleImageChange} />
                      </div>
                    </div>
                    <form className="w-100">
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>ISBN</label>
                        <input type="text" className="form-control" name="isbn" value={product.isbn} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Price</label>
                        <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Quantity In Stock</label>
                        <input type="number" className="form-control" name="quantityInStock" value={product.quantityInStock} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Publisher</label>
                        <input type="text" className="form-control" name="publisher" value={product.publisher} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Author</label>
                        <input type="text" className="form-control" name="author" value={product.author} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Category ID</label>
                        <input type="text" className="form-control" name="categoryId" value={product.categoryId} onChange={handleChange} />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal} style={{ backgroundColor: "gray" }}>Close</button>
                  <button type="button" className="btn btn-success" onClick={handleSubmit} style={{ backgroundColor: "green" }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}