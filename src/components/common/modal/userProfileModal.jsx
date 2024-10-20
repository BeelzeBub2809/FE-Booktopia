import { useState } from 'react'
export default function UserProfileModal({ showModal, handleCloseModal }) {
  const [imagePreview, setImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg')
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      };
      reader.readAsDataURL(file)
    }
  }


  const currentUser = { id: 1, name: 'Jane Cooper', role: 'Manager', phone: '(225) 555-0118', email: 'jane@microsoft.com', status: 'Active' }
  return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'flex', minHeight: '120vh', background: 'none',  alignItems: 'flex-end'}} tabIndex="-1" role='dialog'>
            <div className="modal-dialog modal-lg modal-dialog-centered" role='document'>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Profile User</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <div className='d-flex' style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={imagePreview} alt="User" className="avatar" style={{width: '40%'}}/>
                      <div className="mt-3">
                        <div className="mt-3">
                          <label className="form-label text-dark">Upload Image</label>
                          <input type="file" className="form-control" accept="image/png, image/jpeg" onChange={handleImageChange} />
                        </div>
                      </div>
                    </div>
                    <form className="w-100">
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Full name</label>
                        <input type="text" className="form-control" value={currentUser?.name || ''} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Email</label>
                        <input type="email" className="form-control" value={currentUser?.email || ''} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Phone</label>
                        <input type="text" className="form-control" value={currentUser?.phone || ''} />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal} style={{backgroundColor: "gray"}}>Close</button>
                  <button type="button" className="btn btn-success" style={{backgroundColor: "green"}}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}