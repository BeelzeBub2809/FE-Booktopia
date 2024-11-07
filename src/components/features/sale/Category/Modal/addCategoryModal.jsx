import { useState, useEffect, Fragment } from 'react';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json"; 
import Lottie from "react-lottie"; // Lottie for animation
import Swal from 'sweetalert2';
import ProductService from '../../../../../services/product/productService';
import CategoryService from '../../../../../services/product/categoryService';
import { ValidatorsControl } from '../../../../../utils/validators-control';
import { Rules } from '../../../../../utils/rules';
export default function AddCategoryModal({ showModal, handleCloseModal }) {
  const [category, setCategory] = useState({
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
 
  const handleChange = (e) => {
    setCategory({...category, name: e.target.value});
  };

  const handleSubmit = async (e) => {
    let formControl = new ValidatorsControl({
      name: { value: category.name, validators: Rules.name},
    })

    let isSubmit = formControl.submitForm(e);
    if(isSubmit) {
      try {
        const res = await CategoryService.createCategory(category);
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
    }
  };

  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'flex', width: '600px', minHeight: '120vh', background: 'none', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
            <div className="modal-dialog modal-lg modal-dialog-centered" role='document' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="modal-content" style={{ width: '400px', height: '180px'}}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Category</h5>
                </div>
                <div className="modal-body">
                    <div className='d-flex' style={{  flexDirection: 'column', alignItems: 'center' }}>
                      <form className="w-100">
                          <div className="form-group mb-3 text-start text-dark" style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={category.name} onChange={handleChange} />
                            <div validation="name" className="error-message" style={{ color: 'red' }} alias="Category Name"></div>
                          </div>
                      </form>
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
  );
}