import React, { useState } from 'react';
import './Create.css';
import { ValidatorsControl } from '../../../../utils/Validator/Validator';
import { Rules } from '../../../../utils/Validator/rules';
import Swal from 'sweetalert2'

function Create({ showModal, handleCloseModal }) {
    
    const fakeCategories = [
        {
            isbn: '978-3-16-148410-0',
            name: 'Education',
        },
        {
            isbn: '978-3-16-148410-1',
            name: 'Math',
        },
        {
            isbn: '978-3-16-148410-2',
            name: 'Physics',
        }
    ]

    const [productCode, setProductCode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [publisher, setPublisher] = useState('');
    const [authors, setAuthors] = useState('');
    const [description, setDiscription] = useState('');
    const [categories, setCategories] = useState(fakeCategories);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [images, setImages] = useState([]);
    const userId = 1;

    let formControl = new ValidatorsControl({
        productCode: { value: productCode, validators: Rules.code},
        name: { value: name, validators: Rules.name},
        description: { value: description, validators: Rules.description},
        price: {value: price, validators: Rules.price},
        publisher: {value: publisher, validators: Rules.name},
        authors: {value: authors, validators: Rules.name},
    })
    
    const handleAddSubject = async (e) => {
        let isSubmit = formControl.submitForm(e);
        if(isSubmit){
            let createConditions = {
                subjectCode: productCode,
                name: name,
                description: description,
                manager: userId,
                price: 0,
                createBy: userId
            }
            Swal.fire({
                title: `Success request`,
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Ok',
                // preConfirm: async () => {
                //     await SubjectService.createSubject(createConditions)
                //     .catch((error) => {
                //         Swal.showValidationMessage(`Request failed: ${error}`);
                //     });
                // },
            }).then(() => {
                handleCloseModal();
                window.location.reload()
            })
        }
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImages(imageUrls);
      };

    return (
    <>
      {showModal &&
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create product</h5>
                        </div>
                        <div className="modal-body">
                            <div className="flex-direction-column">
                                <form className="w-100">
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Product name</label>
                                        <input type="text" className="form-control" onBlur={(e)=>setName(e.target.value)}/>
                                        <div validation="name" className="error-message" style={{color:'red'}} alias="Product name"></div>
                                    </div>
                                    <div className='row'>
                                        <div className="form-group col-md-6">
                                                <label className='mb-2' >Product code</label>
                                                <input type="text" className="form-control" onBlur={(e)=>setProductCode(e.target.value)}/>
                                                <div validation="productCode" className="error-message" style={{color:'red'}} alias="Product code"></div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2' >Price</label>
                                            <input type="text" className="form-control" onBlur={(e)=>setPrice(e.target.value)}/>
                                            <div validation="price" className="error-message" style={{color:'red'}} alias="Price"></div>
                                        </div>
                                    </div>
                                    <div className = "row">
                                        <div className="form-group col-md-6">
                                            <label className='mb-2' >Publisher</label>
                                            <input type="text" className="form-control" onBlur={(e)=>setPublisher(e.target.value)}/>
                                            <div validation="publisher" className="error-message" style={{color:'red'}} alias="Publisher"></div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2' >Authors</label>
                                            <input type="text" className="form-control" onBlur={(e)=>setAuthors(e.target.value)}/>
                                            <div validation="authors" className="error-message" style={{color:'red'}} alias="Authors"></div>
                                        </div>
                                    </div>
                                   
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Category</label>
                                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                        {
                                            categories.map(c => (
                                                <option key={c.isbn} value={c.isbn}>
                                                    {
                                                        c.name
                                                    }
                                                </option>
                                            ))
                                        }
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Description: </label>
                                        <textarea type="text" className="form-control" style = {{height:"6em"}} onBlur={(e)=>setDiscription(e.target.value)}/>
                                        <div validation="description" className="error-message" style={{color:'red'}} alias="description"></div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Upload Images</label>
                                        <input type="file" className="form-control" multiple accept="image/jpeg, image/png" onChange={handleImageUpload} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2'>Image Preview</label>
                                        <div className="image-preview">
                                            {images.map((image, index) => (
                                                <img key={index} src={image} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                            <button type="button" className="btn btn-success" onClick={(e) => handleAddSubject(e)}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      }
    </>
  );
};

export { Create };