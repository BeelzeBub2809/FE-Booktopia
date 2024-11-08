import { useState, useEffect, Fragment } from 'react';
import { Modal, Button, Tabs, Tab, Form, Row, Col } from 'react-bootstrap';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json"; 
import Lottie from "react-lottie"; // Lottie for animation
import Swal from 'sweetalert2';
import Select from 'react-select';
import DiscountService from '../../../../../services/product/discountService';
import ProductService from '../../../../../services/product/productService';
import { ValidatorsControl } from '../../../../../utils/validators-control';
import { Rules } from '../../../../../utils/rules';
export default function AddDiscountModal({ showModal, handleCloseModal }) {
  const [key, setKey] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [searchNameProduct, setSearchNameProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [item, setItem] = useState({
    name: '',
    discount: 0,
    startDate: '',
    endDate: '',
    productId: '',
    minOrderPrice: 0,
    maxOrderPrice: 0
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
   
    const fetchProducts = async () => {
      try {
        const data = {status: 'active'};
        const res = await ProductService.getProductWithData(data);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    setLoading(true);
    fetchProducts();

  }, []);

  const handleSearchProduct = (e) => {
    setSearchNameProduct(e.target.value);
  };
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setItem(prevDiscount => ({
      ...prevDiscount,
      productId: product._id
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setItem({...item, [name]: value});
  };

  const handleSubmit = async (e) => {
    let formControl = new ValidatorsControl({
      startDate: { value: item.startDate, validators: Rules.date},
      endDate: { value: item.endDate, validators: Rules.date},
    })
    if(key == 0){
      formControl.setField('discount', item.discount, Rules.discount);
    } else if (key == 1){
      formControl.setField('minOrderPrice', item.minOrderPrice, Rules.number);
      formControl.setField('maxOrderPrice', item.maxOrderPrice, Rules.number);
    }

    let isSubmit = formControl.submitForm(e);
    if(!isSubmit) return;

    if(item.startDate > item.endDate) {
      Swal.fire({
        title: 'Error',
        text: 'Start date must be less than End date',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    if( key == 0 && selectedProduct === null) {
      Swal.fire({
        title: 'Error',
        text: 'Please select one product',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    if( key == 1 && item.minOrderPrice > item.maxOrderPrice) {
      Swal.fire({
        title: 'Error',
        text: 'Min order price must be less than Max order price',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    try {
      let createCondition = {
        startDate: item.startDate,
        endDate: item.endDate,
      }
      if(key == 0){
        createCondition = { ...createCondition, productId: item.productId, discount: item.discount }
      } else if (key == 1){
        createCondition = { ...createCondition, minOrderPrice: item.minOrderPrice, maxOrderPrice: item.maxOrderPrice }
      }

      const res = await DiscountService.createDiscount(createCondition);
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
          <div className="modal fade show" style={{ display: 'flex', width: '600px', minHeight: '120vh', background: 'none', alignItems: 'flex-end' }} tabIndex="-1" role='dialog'>
          <div className="modal-dialog modal-lg modal-dialog-centered" role='document' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="modal-content" style={{ width: '400px', height: '90vh'}}>
                <div className="modal-header">
                  <h5 className="modal-title">Add discount</h5>
                </div>
                <div className="modal-body">
                  <div className="form-group mb-3 d-flex flex-row text-start text-dark justify-content-between">
                    <div className='d-flex flex-column' style={{margin: '5px'}}>
                      <label>Start Date</label>
                      <input style={{ height: '38px', width:'10vw'}} type="date" className="form-control" value={item.startDate} name="startDate" onChange={handleChange} />
                      <div validation="startDate" className="error-message" style={{ color: 'red' }} alias="Start Date"></div>
                    </div>

                    <div className='d-flex flex-column' style={{margin: '5px'}}>
                      <label>End Date</label>
                      <input style={{ height: '38px', width:'10vw' }} type="date" className="form-control" value={item.endDate} name="endDate" onChange={handleChange} />
                      <div validation="endDate" className="error-message" style={{ color: 'red' }} alias="End Date"></div>
                    </div>
                  </div>

                  <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                    <Tab eventKey={0} title="Discount product">
                      <div className='d-flex' style={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{width: '90%'}}>
                          <label>Discount</label>
                          <input style={{ height: '38px'}} type="text" className="form-control" value={item.discount} name="discount" onChange={handleChange} />
                          <div validation="discount" className="error-message" style={{ color: 'red' }} alias="Discount"></div>
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{width: '90%'}}>
                            <div className="mt-2">
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
                            <Form.Group className="mt-2">
                              <Form.Label>Search Products</Form.Label>
                              <Form.Control
                                type="text"
                                style={{ height: '38px' }}
                                value={searchNameProduct}
                                onChange={handleSearchProduct}/>
                            </Form.Group>
                            <Form.Group className="mt-2">
                              <Form.Label style={{marginRight:'10px'}}>Select Products</Form.Label>
                              <div className='d-flex flex-column' style={customProductStyles}>
                                { 
                                  products && products.filter((p) => 
                                    p.name.toLowerCase().includes(searchNameProduct.toLowerCase()) 
                                      && (selectedCategoryId === '' || p.categoryId.some(cate => cate._id == selectedCategoryId)))
                                    .map((p) => (
                                      <Button 
                                        key={p._id}
                                        variant={ selectedProduct !== null && selectedProduct._id === p._id ? 'success' : 'secondary'}
                                        onClick={() => handleProductSelect(p)}
                                        className='d-flex flex-row mt-2'>
                                        <img src={p.image[0]} alt="Product" style={{ width: '34px', height: '34px', objectFit: 'cover' }} />
                                        <div style={{margin:'auto'}}>
                                          {p.name}
                                        </div>
                                    </Button>
                                  ))
                                }
                              </div>
                            </Form.Group>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey={1} title="Discount order">
                      <form className="w-100">
                          <div className='d-flex flex-column' style={{margin: '5px', width: '100%vw'}}>
                            <label>Min order price</label>
                            <input style={{ height: '38px'}} type="text" className="form-control" value={item.minOrderPrice} name="minOrderPrice" onChange={handleChange} />
                            <div validation="minOrderPrice" className="error-message" style={{ color: 'red' }} alias="Min order number"></div>
                          </div>
                          <div className='d-flex flex-column' style={{margin: '5px', width: '100%vw'}}>
                            <label>Max discount price</label>
                            <input style={{ height: '38px'}} type="text" className="form-control" value={item.maxOrderPrice} name="maxOrderPrice" onChange={handleChange} />
                            <div validation="maxOrderPrice" className="error-message" style={{ color: 'red' }} alias="Max order number"></div>
                          </div>
                      </form>
                    </Tab>
                  </Tabs>
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
  maxHeight: '180px',
  overflowY: 'auto', 
};