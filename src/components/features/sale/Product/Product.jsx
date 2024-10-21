import { useState, useEffect } from 'react'
import './List.css'
import { Create } from './Create';
import { Edit } from './Edit';

function Product() {
    const [data, setData] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterConditions, setFiterConditions] = useState({author: 'me', searchString: ''});
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [size, setSize] = useState(15);

    const fakeProducts = [
        {
          isbn: '978-3-16-148410-0',
          name: 'Product 1',
          price: 19,
          discountId: 1,
          quantityInStock: 100,
          publisher: 'Publisher 1',
          author: ['Author 1'],
          sold: 50,
          categoryId: 1,
          description: 'Description for product 1',
          releaseDate: new Date('2023-01-01'),
          translator: ['Translator 1'],
          image: ['image1.jpg'],
          status: 'available'
        },
        {
          isbn: '978-1-23-456789-7',
          name: 'Product 2',
          price: 29,
          discountId: 1,
          quantityInStock: 200,
          publisher: 'Publisher 2',
          author: ['Author 2'],
          sold: 75,
          categoryId: 1,
          description: 'Description for product 2',
          releaseDate: new Date('2023-02-01'),
          translator: ['Translator 2'],
          image: ['image2.jpg'],
          status: 'available'
        },
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
        const fetchData = async () => {
            let searchConditions = {
                page: page,
                size: size,
                managerId: 1,
                searchString: filterConditions.searchString,
            }
            setData(fakeProducts);
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
                <h1>Product</h1>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <label className="me-2">Show by:</label>
                        <select className="form-select d-inline-block w-auto" name = "author" onChange={handleSortChange}>
                            <option value="me">Manage by me</option>
                            <option value="others">Other managers</option>
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
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Publisher</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.isbn}>
                                    <td>{item.isbn}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantityInStock}</td>
                                    <td>{item.publisher}</td>
                                    <td>
                                        {
                                            item.status ? (
                                                <span className = "badge bg-success">
                                                    Active
                                                </span>
                                            ) : ( 
                                                <span className = "badge bg-danger">
                                                    Inactive
                                                </span>
                                            )
                                        }
                                    </td>
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
                                    {/* <td>
                                        <span type="button" className = "badge bg-info" onClick={() => handleViewChapters(item)}>
                                            View
                                        </span>
                                    </td> */}
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

export { Product };