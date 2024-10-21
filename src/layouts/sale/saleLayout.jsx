import { Routes, Route } from 'react-router-dom'
import HeaderEmp from '../../components/common/employee/Header/headerEmp';
import SideBarEmp from '../../components/common/employee/Sidebar/sideBarEmp';
import ProductSale from '../../components/features/sale/Product/productSale';
const SaleLayout = () => {
  return (
    <div>
      <HeaderEmp />
      <SideBarEmp />
      <Routes>
        <Route path="/product" element={<ProductSale />} />
      </Routes>
    </div>
  );
}

export default SaleLayout