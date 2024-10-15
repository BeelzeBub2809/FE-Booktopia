import './App.css';
import { useEffect, useLayoutEffect } from 'react';
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/customer/customerLayout.jsx'
import { 
  Header
} from "./index.js"

function App() {

  // const { userLoggedIn } = useUserLogin()
  // const { dispatchUserWishlist } = useWishlist()
  // const { dispatchUserCart } = useCart()


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" exact element={<CustomerLayout/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;