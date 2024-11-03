import { useState, useEffect, Fragment } from 'react';
import LoadingLottie from "../../../../../Assets/Lottie/loading-0.json";
import Lottie from "react-lottie"; // Lottie for animation
import Swal from 'sweetalert2';
import ProductService from '../../../../../services/product/productService';
export const IMAGE_DEFAULT = 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg';
export default function AddProductModal({ showModal, handleCloseModal }) {
  const [imagePreview, setImagePreview] = useState(IMAGE_DEFAULT);
  const [imageList, setImageList] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedCategories, setSelectedCategories] = useState('');
  const [authors, setAuthors] = useState([]);
  const [item, setItem] = useState({
    isbn: '',
    author: [],
    name: '',
    price: 0,
    quantityInStock: 0,
    publisher: '',
    categoryId: [],
    description: '',
    releaseDate: '',
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
        setCategory(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const selectedCategories = item.categoryId;

    if (checked) {
      selectedCategories.push(value);
    } else {
      const index = selectedCategories.indexOf(value);
      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }
    setItem({ ...item, categoryId: selectedCategories });
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, '']);
  };

  const handleRemoveAuthor = (index) => {
    const newAuthor = authors.filter((_, i) => i !== index);
    setAuthors(newAuthor);
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
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

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await ProductService.createProduct({ ...item, author: authors });
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
              <div className="modal-content" style={{ width: '600vw', height: '95vh'}}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Product To Stock</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex" style={{ gap: '20px' }}>
                    <div className='d-flex' style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{ width: '80%', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={imagePreview} alt="Product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <div className="mt-3">
                          <label className="form-label text-dark">Upload Image</label>
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
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark" style={{ width: '80%'}}>  
                          <div className="d-flex flex-wrap" style={{maxHeight: '160px', overflow:'auto'}}>
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
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Authors</label>
                        <div className='d-flex flex-column' style={customAuthorViewStyles}>
                          {
                            authors.map((author, index) => (
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
                                  <button type="button" onClick={() => handleRemoveAuthor(index)} className="btn btn-danger btn-small" style={{ padding: '8px 8px' }}>x</button>
                                </div>
                                <div validation={`answerContent_${index}`} className="error-message" style={{ color: 'red' }} alias="This answer"></div>
                              </Fragment>
                            ))
                          }
                          <button type="button" onClick={handleAddAuthor} className="btn btn-primary" style={{ padding: "4px 8px" }}>Add author</button>
                          <div className="error-type" style={{ color: 'red' }}></div>
                        </div>
                      </div>
                    </div>
                    <form className="w-100">
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>ISBN</label>
                        <input type="text" className="form-control" name="isbn" value={item.isbn} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" value={item.name} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Price</label>
                        <input type="number" className="form-control" name="price" value={item.price} onChange={handleChange} />
                      </div>
                      {/* <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Quantity In Stock</label>
                        <input type="number" className="form-control" name="quantityInStock" value={product.quantityInStock} onChange={handleChange} />
                      </div> */}
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Publisher</label>
                        <input type="text" className="form-control" name="publisher" value={item.publisher} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Category ID</label>
                        {category.map((c) => (
                          <div key={c._id} className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`category-${c._id}`}
                              value={c._id}
                              checked={item.categoryId.includes(c._id)}
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
                        <input type="date" className="form-control" name="releaseDate" value={item.releaseDate} onChange={handleChange} />
                      </div>
                      <div className="form-group mb-3 d-flex flex-column text-start text-dark">
                        <label>Description</label>
                        <textarea className="form-control" name="description" value={item.description} onChange={handleChange} placeholder='Let input the fact of product'></textarea>
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

export const customAuthorViewStyles = {
  maxHeight: '160px',
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