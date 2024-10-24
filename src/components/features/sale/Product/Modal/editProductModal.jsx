import { useState, useEffect, Fragment } from 'react';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json"; 
import Lottie from "react-lottie"; // Lottie for animation
import Swal from 'sweetalert2';
import ProductService from '../../../../../services/product/productService';

export default function EditProductModal({ showModal, handleCloseModal, item }) {
  const [loading, setLoading] = useState(true); 
  const [imagePreview, setImagePreview] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
  const [category, setCategory] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
      _id: '',
      isbn: '',
      author: [],
      name: '',
      price: 0,
      quantityInStock: 0,
      publisher: '',
      categoryId: [],
      description: '',
      releaseDate: new Date(),  
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
        setCategory(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });

    if (item) {
      setSelectedItem({...item, releaseDate: item.releaseDate ? new Date(item.releaseDate).toISOString().split('T')[0] : ''});
    }
  }, [item]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const selectedCategories = selectedItem.categoryId;

    if (checked) {
      selectedCategories.push(value);
    } else {
      const index = selectedCategories.indexOf(value);
      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }
    setSelectedItem({ ...selectedItem, categoryId: selectedCategories });
  };

    const handleAddAuthor = () => {
      setAuthors([...authors, '']);
    };
  
    const handleRemoveAuthor = (index) => {
      const newAuthor = authors.filter((_, i) => i !== index);
      setAuthors(newAuthor);
    };    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem((prevItem) => ({
        ...prevItem,
        [name]: value,
        }));
    };
    
    const handleInputChange = (index, event) => {
      const { value } = event.target;
      const newAuthors = [...authors];
      newAuthors[index] = value;
      setAuthors(newAuthors);
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setSelectedItem({ ...selectedItem, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSave = async (e) => {
      try {
        const res = await ProductService.updateProduct({...selectedItem, author: authors});
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
                <div className="modal-dialog modal-lg modal-dialog-centered" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Edit Product</h5>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex" style={{ gap: '20px' }}>
                          <div className='d-flex' style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                            <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={imagePreview} alt="Product" className="avatar" style={{ width: '40%' }} />
                                <div className="mt-3">
                                <label className="form-label text-dark">Upload Image</label>
                                <input type="file" className="form-control" accept="image/png, image/jpeg" onChange={handleImageChange} />
                                </div>
                            </div>

                            <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                                <label>Authors</label>
                                <>
                                  {
                                    selectedItem.author.map((author, index) => (
                                      <Fragment>
                                        <div key={index} className="form-group d-flex align-items-center">
                                          <input
                                              type="text"
                                              name={`answerContent_${index}`}
                                              value={author}
                                              onChange={e => handleInputChange(index, e)}
                                              className="form-control"
                                              style={{ marginRight: '10px' }}
                                          />
                                          <button type="button" onClick={() => handleRemoveAuthor(index)} className="btn btn-danger btn-small" style={{ padding: '8px 8px'  }}>x</button>
                                        </div>
                                        <div validation={`answerContent_${index}`} className="error-message" style={{ color: 'red' }} alias="This answer"></div>
                                      </Fragment>
                                    ))
                                  }
                                  <button type="button" onClick={handleAddAuthor} className="btn btn-primary" style={{padding: "4px 8px"}}>Add author</button>
                                  <div className="error-type" style={{ color: 'red' }}></div>
                                </>
                            </div>
                        </div>
                        <form className="w-100">
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>ISBN</label>
                            <input type="text" className="form-control" name="isbn" value={selectedItem.isbn} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={selectedItem.name} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>Price</label>
                            <input type="number" className="form-control" name="price" value={selectedItem.price} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>Quantity In Stock</label>
                            <input type="number" className="form-control" name="quantityInStock" value={selectedItem.quantityInStock} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>Publisher</label>
                            <input type="text" className="form-control" name="publisher" value={selectedItem.publisher} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>Category</label>
                            {category.map((c) => (
                                <div key={c._id} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`category-${c._id}`}
                                    value={c._id}
                                    checked={selectedItem.categoryId.includes(c._id)}
                                    onChange={handleCategoryChange}
                                />
                                <label className="form-check-label" htmlFor={`category-${c._id}`}>
                                    {c.name}
                                </label>
                                </div>
                            ))}
                        </div>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>Release date</label>
                            <input type="date" className="form-control" name="releaseDate" value={selectedItem.releaseDate} onChange={handleChange} />
                        </div>

                        </form>
                    </div>
                    <div style = {{ marginRight: "10px",  marginLeft: "10px"}}>
                        <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                            <label>Description</label>
                            <textarea className="form-control" name="description" value={selectedItem.description} onChange={handleChange} placeholder='Let input the fact of product'></textarea>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary btn-small" 
                        onClick={handleCloseModal} style={{ backgroundColor: "gray" }}>Close</button>
                      <button type="button" className="btn btn-success btn-small" 
                        onClick={handleSave} style={{ backgroundColor: "green" }}>Save</button>
                    </div>
                </div>
                </div>
            </div>
            </>
        )}
        </>
    )
}