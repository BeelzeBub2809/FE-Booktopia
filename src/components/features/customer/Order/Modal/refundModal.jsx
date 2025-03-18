import { useState } from 'react';
import Swal from 'sweetalert2';
import RefundService from '../../../../../services/refund/refundService';

export default function RefundModal({ showModal, handleCloseModal, orderId }) {
  const [imagePreview, setImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
  const [refundReq, setRefundReq] = useState({
    reason: '',
    orderId: orderId,
    status: 'pending',
  });
  console.log(refundReq);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert to array
    const imageFiles = [];
    const imagePreviews = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagePreviews.push(reader.result);
        imageFiles.push(reader.result.split(",")[1]);

        // Update state only when all files are processed
        if (imageFiles.length === files.length) {
          setImagePreview(imagePreviews); // Preview URLs
          setRefundReq({ ...refundReq, images: imageFiles }); // Image data for upload
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRefundReq({ ...refundReq, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res= await RefundService.createRefund(refundReq);
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
      })
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

  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'flex', minHeight: '120vh', background: 'none', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
            <div className="modal-dialog modal-lg modal-dialog-centered" role='document'>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Refund</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <div className='d-flex' style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={imagePreview} alt="Product" className="avatar" style={{ width: '40%' }} />
                        <div className="mt-3">
                          <label className="form-label text-dark">Upload Image</label>
                          <input type="file" className="form-control" accept="image/png, image/jpeg" multiple onChange={handleImageChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginRight: "10px", marginLeft: "10px" }}>
                    <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                      <label>Reason</label>
                      <textarea className="form-control" name="reason" value={refundReq.reason} onChange={handleChange} placeholder='Let input the fact of product'></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-small" onClick={handleCloseModal} style={{ backgroundColor: "gray" }}>Close</button>
                  <button type="button" className="btn btn-success btn-small" onClick={handleSubmit} style={{ backgroundColor: "green" }}>Submit request</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}