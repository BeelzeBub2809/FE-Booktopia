import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/customer/customerLayout.jsx';
import SaleLayout from './layouts/sale/saleLayout.jsx';
import MarketerLayout from './layouts/marketer/marketerLayout.jsx';
import AdminLayout from './layouts/admin/adminLayout.jsx';
import NoAccessPage from './components/common/auth/errorPage/noPermission.jsx';
import PrivateRoute from './components/common/auth/privateRoute/privateRoute.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<CustomerLayout />} />
          
          <Route
            path="/sale/*"
            element={
              <PrivateRoute
                element={<SaleLayout />}
                allowedRoles={['sale']}
              />
            }
          />
          <Route
            path="/marketer/*"
            element={
              <PrivateRoute
                element={<MarketerLayout />}
                allowedRoles={['marketer']}
              />
            }
          />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute
                element={<AdminLayout />}
                allowedRoles={['admin']}
              />
            }
          />

          <Route path="/no-access" element={<NoAccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
