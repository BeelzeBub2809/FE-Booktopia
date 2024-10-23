import './App.css';
import { useEffect, useLayoutEffect } from 'react';
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/customer/customerLayout.jsx'
import { 
  Header
} from "./index.js"
import SaleLayout from './layouts/sale/saleLayout.jsx';
import NoAccessPage from './components/common/auth/errorPage/noPermission.jsx';
import PrivateRoute from './components/common/auth/privateRoute/privateRoute.jsx';

function App() {

  // const { userLoggedIn } = useUserLogin()
  // const { dispatchUserWishlist } = useWishlist()
  // const { dispatchUserCart } = useCart()


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<CustomerLayout/>} />
          <Route path='/sale/*' element={<SaleLayout/>} />
          <Route path="/no-access" element={<NoAccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;