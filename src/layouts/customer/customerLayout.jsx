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
import PrivateRoute from '../../components/common/auth/privateRoute/privateRoute.jsx';
import { ComboProductPage } from '../../components/features/customer/ComboProductPage/ComboProductPage.jsx';

const CustomerLayout = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/shop/:id" element={<ProductPage />} />
        <Route path="/shop/combo/:id" element={<ComboProductPage/>} />
        <Route path="/wishlist" element={<PrivateRoute element={<Wishlist />} allowedRoles={['customer']} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} allowedRoles={['customer']} />} />
        <Route path="/login-res" element={<LoginAndRegister />} />
        <Route path="/orders" element={<PrivateRoute element={<OrderCustomer />} allowedRoles={['customer']} />} />
      </Routes>
    </div>



  );
}

export default CustomerLayout