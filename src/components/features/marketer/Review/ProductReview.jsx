import React, { Component } from 'react';
import './ProductReview.css';
import { DataTable } from 'simple-datatables';
import LoadingLottie from '../../../../Assets/Lottie/loading-0.json';
import Lottie from "react-lottie"; 
import Swal from 'sweetalert2';

class ProductReview extends Component {
  state = {
    data: [],
    loading: true
  };

  loadingObj = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  tableRef = React.createRef();
  dataTable = null;

  componentDidMount() {
    this.fetchReviews();
  }

  componentWillUnmount() {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  fetchReviews = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch("http://localhost:9999/api/review", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const result = await response.json();
      this.setState({ data: result.data, loading: false });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      this.setState({ loading: false });
    }
  };

  handleChangeActive = async (id, status) => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    try {
      const response = await fetch(`http://localhost:9999/api/review/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update review status');
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Review status changed to ${newStatus}`,
      });

      // Update the state without reloading the page
      this.setState(prevState => ({
        data: prevState.data.map(review => 
          review._id === id ? { ...review, status: newStatus } : review
        )
      }));

    } catch (error) {
      console.error('Error updating review status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to change review status.',
      });
    }
  };

  componentDidUpdate() {
    const { data, loading } = this.state;
    if (data.length > 0 && !loading) {
      if (!this.dataTable) {
        this.dataTable = new DataTable(this.tableRef.current, {
          perPageSelect: [10, 15, ["All", -1]],
          searchable: true,
          paging: true,
          perPage: 10,
          columns: [
            { select: 0, sortSequence: ["desc", "asc"] },
            { select: 1, sortSequence: ["desc"] },
            { select: 4, cellClass: "green", headerClass: "red" }
          ]
        });

        this.tableRef.current.addEventListener('click', (event) => {
          const target = event.target;
          const row = target.closest('tr');
          const rowIndex = row ? row.getAttribute('data-index') : null;
          const selectedReview = data[rowIndex];

          // Check if the clicked target is a button
          if (target.classList.contains('btn-warning') || target.classList.contains('btn-danger')) {
            this.handleChangeActive(selectedReview._id, selectedReview.status);
          }
        });
      }
    }
  }

  render() {
    const { data, loading } = this.state;

    return (
      <main id="main" className="main">
        <div className="pagetitle">
          <h2>Manage Product Reviews</h2>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <Lottie options={this.loadingObj} height={100} width={100} />
                  ) : (
                    <table ref={this.tableRef} className="table datatable">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Product Name</th>
                          <th>Rating</th>
                          <th>Content</th>
                          <th>Status</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((review, index) => (
                          <tr key={review._id} data-index={index}>
                            <td>{review.customerId.userId.userName}</td>
                            <td>{review.productId.name}</td>
                            <td>{review.rating}</td>
                            <td>{review.content}</td>
                            <td>{review.status}</td>
                            <td>{new Date(review.createdAt).toLocaleString()}</td>
                            <td>
                              <button
                                className={`btn btn-sm me-2 ${
                                  review.status === 'active'
                                    ? 'btn-warning'
                                    : 'btn-danger'
                                }`}
                              >
                                {review.status === 'active' ? 'Deactivate' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default ProductReview;
