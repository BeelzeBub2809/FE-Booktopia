import { useState, useEffect, Fragment } from 'react';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json"; 
import Lottie from "react-lottie"; // Lottie for animation
import Swal from 'sweetalert2';
import ProductService from '../../../../../services/product/productService';
import { ValidatorsControl } from '../../../../../utils/validators-control';
import { Rules } from '../../../../../utils/rules';
export const IMAGE_DEFAULT = 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';
export default function InputStockModal({ showModal, handleCloseModal, item }) {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedItem, setSelectedItem] = useState({
      _id: '',
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
      setSelectedItem({_id: item._id});
    }
  }, [item]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;

      if (name === 'price') {
        setPrice(value);
      } else if (name === 'quantity') {
        setQuantity(value);
      }
    };
    
    const handleAdd = async (e) => {
      let formControl = new ValidatorsControl({
        price: { value: price, validators: Rules.price},
        quantity: { value: quantity, validators: Rules.quantity},
      })
      if (!formControl.submitForm(e)){
        return;
      } 
      try {
        const res = await ProductService.addProductToStorage({ _id: selectedItem._id, quantityInStock: quantity, price: price });
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

    return(
      <>
        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'flex', minHeight: '120vh', background: 'none', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
              <div className="modal-dialog modal-lg modal-dialog-centered" role='document' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="modal-content" style={{ width: '600vw'}}>
                  <div className="modal-header">
                    <h5 className="modal-title">Input to Stock</h5>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex" style={{ gap: '20px' }}>
                      <form className="w-100">
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                          <label>Input price</label>
                          <input type="text" className="form-control" name="price" value={price} onChange={handleChange} />
                          <div validation="price" className="error-message" style={{ color: 'red' }} alias="Price"></div>
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                          <label>Input more to stock</label>
                          <input type="text" className="form-control" name="quantity" value={quantity} onChange={handleChange} />
                          <div validation="quantity" className="error-message" style={{ color: 'red' }} alias="Quantity"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary btn-small" 
                      onClick={handleCloseModal} style={{ backgroundColor: "gray" }}>Close</button>
                    <button type="button" className="btn btn-success btn-small" 
                      onClick={handleAdd} style={{ backgroundColor: "green" }}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
}