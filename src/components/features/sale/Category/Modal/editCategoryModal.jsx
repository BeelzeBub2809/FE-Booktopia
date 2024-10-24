import { useState, useEffect, Fragment } from 'react';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json"; 
import Lottie from "react-lottie"; // Lottie for animation
import Swal from 'sweetalert2';
import ProductService from '../../../../../services/product/productService';
import CategoryService from '../../../../../services/product/categoryService';

export default function EditCategoryModal({ showModal, handleCloseModal, item }) {
  const [loading, setLoading] = useState(true); 
  const [imagePreview, setImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
  const [selectedItem, setSelectedItem] = useState({
      name: '',
  });
  const loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    if (item) {
      setSelectedItem(item);
    }
  }, [item]);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleChange = (e) => {
      setSelectedItem({...selectedItem, name: e.target.value});
    };
  
    const handleSubmit = async () => {
      try {
        const res = await CategoryService.updateCategory(selectedItem);
        Swal.fire({
          title: `successfully`,
          text: res.message,
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Ok',
        }).then(() => {
          handleCloseModal();
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(() => {
          handleCloseModal();
        });
      }
    };

    return(
      <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'flex', width: '600px', minHeight: '120vh', background: 'none', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
            <div className="modal-dialog modal-lg modal-dialog-centered" role='document'>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Category</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '0px' }}>
                    <div className='d-flex' style={{  flexDirection: 'column', alignItems: 'center' }}>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={imagePreview} alt="Product" className="avatar" style={{ width: '40%' }}  onChange={handleImageChange} />
                        <div className="mt-3">
                          <label className="form-label text-dark">Upload Image</label>
                          <input type="file" className="form-control" accept="image/png, image/jpeg" />
                        </div>
                      </div>
                      <div className="form-group mb-3  text-start text-dark" style={{ width: '50%', flexDirection: 'column', alignItems: 'center' }}>
                        <label>Name</label>
                        <input type="text" className="form-control" name="isbn" value={selectedItem.name} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-small" onClick={handleCloseModal} style={{ backgroundColor: "gray" }}>Close</button>
                  <button type="button" className="btn btn-success btn-small" onClick={handleSubmit} style={{ backgroundColor: "green" }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
    )
}