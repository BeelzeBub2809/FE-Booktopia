import React, { useState, useEffect } from 'react';
import './Create.css';
import { ValidatorsControl } from '../../../../utils/Validator/Validator';
import { Rules } from '../../../../utils/Validator/rules';
import Swal from 'sweetalert2';

function Edit({ showModal, handleCloseModal, item }) {
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

    const [categoryCode, setCategoryCode] = useState('');
    const [name, setName] = useState('');

    const [selectedItem, setSelectedItem] = useState({
        categoryCode: '',
        categoryName: '',
    });
    const [isFree, setIsFree] = useState(false);
    const user_detail = 1;

    useEffect(() => {
        if (item) {
        setSelectedItem(item);
        setIsFree(item.price === 0);
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem((prevItem) => ({
        ...prevItem,
        [name]: value,
        }));
    };

    let formControl = new ValidatorsControl({
        categoryCode: { value: categoryCode, validators: Rules.code},
        name: { value: name, validators: Rules.name},
    })

    const handleSaveSubject = (e) => {
        let isSubmit = formControl.submitForm(e);
    }

    return (
    <>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit category</h5>
                    </div>
                    <div className="modal-body">
                        <div className="flex-direction-column">
                            <form className="w-100">
                                <div className="form-group col-md-6">
                                    <label className='mb-2' >Product code</label>
                                    <input type="text" className="form-control" name ="categoryCode" value={selectedItem.categoryCode} onChange={handleChange}/>
                                    <div validation="categoryCode" className="error-message" style={{color:'red'}} alias="Category code"></div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className='mb-2' >Category name</label>
                                    <input type="text" className="form-control" name ="name" value={selectedItem.name} onChange={handleChange}/>
                                    <div validation="name" className="error-message" style={{color:'red'}} alias="Category name"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Back</button>
                        <button type="button" className="btn btn-success" onClick={handleSaveSubject}>Save </button>
                    </div>
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Edit };