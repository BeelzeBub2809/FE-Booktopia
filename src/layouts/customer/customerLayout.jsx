import { Routes, Route } from 'react-router-dom'
import {
  Header,
  Home,
  Shop,
  ProductPage,
  Wishlist,
  Cart,
} from "../../components/features/customer/Index/index.js"
import LoginAndRegister from '../../components/features/customer/Auth/loginAndRegister.jsx';
import OrderCustomer from '../../components/features/customer/Order/orders.jsx';

const CustomerLayout = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/shop/:id" element={<ProductPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login-res" element={<LoginAndRegister />} />
        <Route path="/orders" element={<OrderCustomer />} />
      </Routes>
    </div>



  );
}

export default CustomerLayout