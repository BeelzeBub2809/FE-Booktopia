import { Routes, Route } from 'react-router-dom'
import {
  Header,
  Home,
  Shop,
  ProductPage,
  Wishlist,
  Cart,
} from "../../components/features/customer/Index/index.js"

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
      </Routes>
    </div>



  );
}

export default CustomerLayout