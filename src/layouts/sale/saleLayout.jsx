import { Routes, Route } from 'react-router-dom'
import HeaderEmp from '../../components/common/employee/Header/headerEmp';
import SideBarEmp from '../../components/common/employee/Sidebar/sideBarEmp';
import CategorySale from '../../components/features/sale/Category/categorySale';
import ProductSale from '../../components/features/sale/Product/productSale';
import OrderSale from '../../components/features/sale/Order/orderSale';
import ComboSale from '../../components/features/sale/Combo/comboSale';
import DiscountSale from '../../components/features/sale/Discount/discountSale';
import DashboardSale from '../../components/features/sale/Dashboard/dashboardSale';
import RefundSale from '../../components/features/sale/Refund/refundSale';
const SaleLayout = () => {
  return (
    <div>
      <HeaderEmp />
      <SideBarEmp />
      <Routes>
        <Route path="/" element={<DashboardSale/>} />
        <Route path="/product" element={<ProductSale />} />
        <Route path="/category" element={<CategorySale />} />
        <Route path="/order" element={<OrderSale/>} />
        <Route path="/combo" element={<ComboSale/>} />
        <Route path="/discount" element={<DiscountSale />} />
        <Route path='/refund' element={<RefundSale/>} />
      </Routes>
    </div>
  );
}

export default SaleLayout