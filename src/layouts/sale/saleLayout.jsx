import { Routes, Route } from 'react-router-dom'
import HeaderEmp from '../../components/common/employee/Header/headerEmp';
import SideBarEmp from '../../components/common/employee/Sidebar/sideBarEmp';
import CategorySale from '../../components/features/sale/Category/categorySale';
import ProductSale from '../../components/features/sale/Product/productSale';
const SaleLayout = () => {
  return (
    <div>
      <HeaderEmp />
      <SideBarEmp />
      <Routes>
        <Route path="/product" element={<ProductSale />} />
        <Route path="/category" element={<CategorySale />} />
      </Routes>
    </div>
  );
}

export default SaleLayout