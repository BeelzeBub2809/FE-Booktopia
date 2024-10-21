import { useState, useEffect } from 'react'
import './List.css'
import { Create } from './Create.jsx';
import { Edit } from './Edit.jsx';

function Category() {

    const [data, setData] = useState([]);
    const [filterConditions, setFiterConditions] = useState({author: 'me', searchString: ''});
    const [page, setPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [maxPage, setMaxPage] = useState(0);
    const [size, setSize] = useState(15);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
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
    ];

    const handleSearch = (event) => {
        setFiterConditions({...filterConditions, searchString: event.target.value});
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    }

    const handleSortChange = (value) => {

    }

    useEffect(() => {
        const fetchData = () => {
            let searchConditions = {
                page: page,
                size: size,
                managerId: 1,
                searchString: filterConditions.searchString,
            }
            setData(fakeCategories);
            // let data = await SubjectService.getAllSubjects(searchConditions);
            // if(data){
            //     setData(data.subjects);
            // } else {
            //     setData([]);
            // }
            // setSize(data.pagination.size);
            // setMaxPage(data.pagination.maxPage);
        }
        fetchData();
    }, [page, size, filterConditions]); 

    return (
        <div className="container-fluid">
            <div className="content">
                <h1>Category</h1>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <label className="me-2">Show by:</label>
                        <select className="form-select d-inline-block w-auto" name = "author" onChange={handleSortChange}>
                            <option value="name">Name</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search"
                            onBlur={(e) => handleSearch(e)}/>
                        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>Category Code</th>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.isbn}>
                                    <td>{item.isbn}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className="btn btn-link p-0 me-2" onClick={()=>{ setSelectedItem(item); setShowEditModal(true)}}>
                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                        <button className="btn btn-link p-0 me-2" onClick={()=>{ setSelectedItem(item); setShowEditModal(true)}}>
                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                        <button className="btn btn-link p-0">
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Create showModal={showCreateModal} handleCloseModal={handleCloseCreateModal}/>
            <Edit showModal={showEditModal} handleCloseModal={handleCloseEditModal} item = {selectedItem}/>
        </div>
    )
}

export { Category };