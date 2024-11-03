import { useState, useEffect, Fragment} from 'react';
import { Modal, Button, Tabs, Tab, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json"; 
import Lottie from "react-lottie"; // Lottie for animation
import Swal from 'sweetalert2';
import ComboService from '../../../../../services/combo/comboServices';
export const IMAGE_DEFAULT = 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';
export default function AddComboModal({ showModal, handleCloseModal }) {
    const [imagePreview, setImagePreview] = useState(IMAGE_DEFAULT);
    const [imageList, setImageList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [searchNameProduct, setSearchNameProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [item, setItem] = useState({
      name: '',
      price: 0,
      discount: 100,
      quantity: 0,
      status: 'active',      
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
      fetch("http://localhost:9999/api/category")
        .then(response => response.json())
        .then(data => {
          setCategories(data.data);
          setLoading(false);
        })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });

      fetch("http://localhost:9999/api/product")
        .then(response => response.json())
        .then(data => {
          setProducts(data.data);
          setLoading(false);
        })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });

    }, []);
    
    const handleSearchProduct = (e) => {
      setSearchNameProduct(e.target.value);
    };

    const handleImageChange = (event) => {
      const files = Array.from(event.target.files); 
      const imageFiles = [];
      const imagePreviews = [];

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push(reader.result);
          imageFiles.push(reader.result.split(",")[1]);

          if (imageFiles.length === files.length) {
            setImagePreview(imagePreviews);
            setImageList(prevList => [...prevList, ...imagePreviews]);
            setItem({ ...item, image: imageFiles }); 
          }
        };
        reader.readAsDataURL(file);
      });
    };

    const handleImageClick = (image) => {
      setImagePreview(image);
    };

    const handleShowImage = (image) => {
      setImagePreview(image);
    };
  
    const handleImageRemove = (image) => {
      setImageList(prevList => {
        const newList = prevList.filter(img => img !== image);
        if (newList.length === 0) {
          setImagePreview(IMAGE_DEFAULT);
        } else if (image === imagePreview) {
          setImagePreview(newList[0]);
        }
        setItem(prevItem => {
          return {
            ...prevItem,
            image: newList
          };
        });
        return newList;
      });
    };


    const handleChange = (e) => {
      const { name, value } = e.target;

      setItem({...item, [name]: value});
    };

    const handleProductSelect = (product) => {
      setSelectedProducts(prev => {
        if (prev.some(p => p._id === product._id)) {
          return prev.filter(p => p._id !== product._id);
        } else {
          return [...prev, product];
        }
      });
    };
    
    const handleSubmit = async () => {
      try {
        const res = await ComboService.createCombo({...item, productId: selectedProducts.map(p => p._id)});
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

    return (
      <>
        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'flex', minHeight: '120vh', background: 'none', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
              <div className="modal-dialog modal-lg modal-dialog-centered" role='document' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="modal-content" style={{ width: '600vw', height: '80vh'}}>
                  <div className="modal-header">
                    <h5 className="modal-title">Create combo</h5>
                  </div>
                  <div className="modal-body" style={{overflowY:'auto'}}>
                    <div className="d-flex" style={{ gap: '20px' }}>
                      <div className='d-flex' style={{ width: '60%', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                          <img src={imagePreview} alt="Product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                          <div className="mt-3">
                            <div
                              className="custom-file-upload"
                              style={{
                                display: 'inline-block',
                                padding: '6px 12px',
                                cursor: 'pointer',
                                backgroundColor: '#007bff',
                                color: 'white',
                                borderRadius: '4px',
                                textAlign: 'center'
                              }}
                              onClick={() => document.getElementById('fileInput').click()}>Choose File
                            </div>
                            <input
                              id="fileInput"
                              type="file"
                              className="form-control"
                              accept="image/png, image/jpeg"
                              multiple
                              onChange={handleImageChange}
                              style={{ display: 'none' }}
                            />
                          </div>
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{ width: '80%'}}>  
                          <div className="d-flex flex-wrap">
                            {imageList.map((image, index) => (
                              <div key={index} style={{ position: 'relative', margin: '5px' }}>
                                <img
                                  src={image}
                                  alt={`Product ${index}`}
                                  style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
                                  onClick={() => handleImageClick(image)}/>
                                <button
                                  type="button"
                                  style={customImageStyles}
                                  onClick={() => handleImageRemove(image)}>x</button>
                              </div>
                            ))}
                          </div>              
                        </div>
                      </div>

                      <form className="w-100">
                        <div className="form-group mb-3 d-flex flex-row text-start text-dark justify-content-between">
                          <div className='d-flex flex-column col-7' style={{margin: '5px'}}>
                            <label>Name</label>
                            <input style={{ height: '38px' }} type="text" className="form-control" name="name" value={item.name} onChange={handleChange} />
                          </div>
                          <div className='d-flex flex-column col-3' style={{margin: '5px'}}>
                            <label>Status</label>
                            <Select
                              options={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' }
                              ]}
                              placeholder="Select status..."
                              styles={customStyles}
                              defaultValue={{ value: 'active', label: 'Active' }}
                              onChange={(selectedOption) => setItem(prevItem => ({ ...prevItem, status: selectedOption.value }))}
                            />
                          </div>
                        </div>

                        <div className="form-group mb-3 d-flex flex-row text-start text-dark justify-content-between">
                          <label>Total quantity products: {selectedProducts.length}</label>
                        </div>

                        <div className="form-group mb-3 d-flex flex-row text-start text-dark justify-content-between">
                          <label>Total price products: {selectedProducts.reduce((sum, product) => sum + product.price, 0)} VND</label>
                        </div>

                        <div className="form-group mb-3 d-flex flex-row text-start text-dark justify-content-between">
                          <label>Total price products with discount: {selectedProducts.reduce((sum, product) => sum + product.price, 0)} VND</label>
                        </div>

                        <div className="form-group mb-3 d-flex flex-row text-start text-dark justify-content-between">
                          <div className='d-flex flex-column' style={{margin: '5px'}}>
                            <label>Quantity</label>
                            <input style={{ height: '38px' }} type="text" className="form-control" name="quantity" value={item.quantity} onChange={handleChange} />
                          </div>
                          <div className='d-flex flex-column' style={{margin: '5px'}}>
                            <label>Price</label>
                            <input style={{ height: '38px' }} type="text" className="form-control" name="price" value={item.price} onChange={handleChange} />
                          </div>
                          <div className='d-flex flex-column' style={{margin: '5px'}}>
                            <label>Discount</label>
                            <input style={{ height: '38px' }} type="text" className="form-control" name="discount" value={item.discount} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="form-group mb-3 d-flex flex-row text-start text-dark justify-content-between">
                          <label>Total price: {Math.ceil((item.price *  item.discount / 100) * 10) / 10} VND</label>
                        </div>

                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                          <div className="mt-3">
                            <label className="form-label text-dark">Select cateogory</label>
                            <Select
                              options={[{ value: '', label: 'All' }, ...categories.map((c) => ({ value: c._id, label: c.name }))]}
                              isSearchable
                              placeholder="Select an option..."
                              styles={customStyles}
                              defaultValue={{ value: '', label: 'All' }}
                              onChange={(selectedOption) => setSelectedCategoryId(selectedOption.value)}
                            />
                          </div>
                          <Form.Group className="mt-3">
                            <Form.Label>Search Products</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ height: '38px' }}
                              value={searchNameProduct}
                              onChange={handleSearchProduct}/>
                          </Form.Group>
                          <Form.Group className="mt-3">
                            <Form.Label style={{marginRight:'10px'}}>Select Products</Form.Label>
                            <div className='d-flex flex-column' style={customProductStyles}>
                              { 
                                products && products.filter((p) => 
                                  p.name.toLowerCase().includes(searchNameProduct.toLowerCase()) 
                                    && (selectedCategoryId === '' || p.categoryId.includes(selectedCategoryId)))
                                  .map((p) => (
                                    <Button
                                      key={p._id}
                                      variant={selectedProducts.some(sp => sp._id === p._id) ? 'success' : 'secondary'}
                                      onClick={() => handleProductSelect(p)}
                                      className="m-1">
                                      {p.name}
                                  </Button>
                                ))
                              }
                            </div>
                          </Form.Group>
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

export const customStyles = {
  menu: (provided) => ({
    ...provided,
    maxHeight: '150px', 
    overflowY: 'auto', 
  }),
  control: (provided) => ({
    ...provided,
    minHeight: '28px', // Đặt chiều cao tối thiểu cho thẻ select
  }),
};

export const customProductStyles = {
  maxHeight: '200px',
  overflowY: 'auto', 
};

export const customImageStyles = {
	position: 'absolute',
	top: '0',
	right: '0',
	background: 'red',
	color: 'white',
	border: 'none',
	borderRadius: '50%',
	width: '20px',
	height: '20px',
	cursor: 'pointer'
}