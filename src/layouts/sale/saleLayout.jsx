import { Routes, Route } from 'react-router-dom'
import { Header } from "../../components/common/employee/Header/headerEmp.jsx";
import { Sidebar } from "../../components/common/employee/SiderBar/Siderbar.jsx";
import { Product } from '../../components/features/sale/Product/Product.jsx';
import { Category } from '../../components/features/sale/Category/Category.jsx';
const SaleLayout = () => {
  return (
    <>
       <div className='container-fluid' style={{ padding: 0 }}>
            <Header/>
            <div className='home-component-container' style={{display: 'flex', flexDirection: 'row', padding: 0, gap : 50}}>
                <Sidebar/>
                <div className='container-fluid'>
                    <Routes>
                        <Route path='/product' element={<Product/>} />
                        <Route path='/category' element={<Category/>} />
                    </Routes>
                </div>
            </div>
        </div>
    </>
  );
}

export default SaleLayout