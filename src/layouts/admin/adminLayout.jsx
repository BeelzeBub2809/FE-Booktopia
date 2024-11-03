import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HeaderEmp from '../../components/common/employee/Header/headerEmp';
import SideBarEmp from '../../components/common/employee/Sidebar/sideBarEmp';
import UserInfo from '../../components/features/admin/UserManager/Use';

function adminLayout() {
  return (
    <div>
    <HeaderEmp />
    <SideBarEmp />
    <Routes>
      <Route path="/user" element= {<UserInfo/>}/>   
    </Routes>
  </div>
  )
}

export default adminLayout