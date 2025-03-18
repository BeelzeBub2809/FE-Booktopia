import React from 'react';

const NoAccessPage = () => {
  return (
    <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div class="error-container text-center p-5 bg-white rounded-4 shadow-lg" role="alert" aria-live="polite">
        <div class="error-icon mb-4">
          
        </div>
        <h1 class="display-4 mb-3 fw-bold text-danger">Access Denied</h1>
        <p class="lead mb-4 text-secondary">Sorry, you don't have permission to access this page. Please log in with appropriate credentials.</p>
        <div class="d-grid gap-2 col-md-6 mx-auto">
          <a href="/login-res" class="btn btn-danger btn-lg shadow-sm" role="button" aria-label="Return to login page">
            <i class="bi bi-box-arrow-in-right me-2"></i>Back to Login
          </a>
          <a href="/" class="btn btn-outline-secondary mt-2" role="button" aria-label="Return to homepage">Return to Homepage</a>
        </div>
        <div class="mt-4 text-muted small">
          <p>Error Code: 403 Forbidden</p>
        </div>
      </div>
    </div>
  );
};

export default NoAccessPage;
