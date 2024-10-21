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

    const [categoryCode, setCategoryCode] = useState('');
    const [name, setName] = useState('');
    const userId = 1;

    let formControl = new ValidatorsControl({
        categoryCode: { value: categoryCode, validators: Rules.code},
        name: { value: name, validators: Rules.name},
    })
    
    const handleAddSubject = async (e) => {
        let isSubmit = formControl.submitForm(e);
        if(isSubmit){
            let createConditions = {
                subjectCode: categoryCode,
                name: name,
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

    return (
    <>
      {showModal &&
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create category</h5>
                        </div>
                        <div className="modal-body">
                            <div className="flex-direction-column">
                                <form className="w-100">
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Category code</label>
                                        <input type="text" className="form-control" onBlur={(e)=>setCategoryCode(e.target.value)}/>
                                        <div validation="categoryCode" className="error-message" style={{color:'red'}} alias="Category code"></div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className='mb-2' >Category name</label>
                                        <input type="text" className="form-control" onBlur={(e)=>setName(e.target.value)}/>
                                        <div validation="name" className="error-message" style={{color:'red'}} alias="Category name"></div>
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