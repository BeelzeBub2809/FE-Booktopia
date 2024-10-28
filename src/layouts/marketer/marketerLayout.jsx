import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HeaderEmp from '../../components/common/employee/Header/headerEmp';
import SideBarEmp from '../../components/common/employee/Sidebar/sideBarEmp';
import ProductReview from '../../components/features/marketer/Review/ProductReview';

function marketerLayout() {
  return (
    <div>
    <HeaderEmp />
    <SideBarEmp />
    <Routes>
      <Route path="/review" element= {<ProductReview/>}/>   
    </Routes>
  </div>
  )
}

export default marketerLayout