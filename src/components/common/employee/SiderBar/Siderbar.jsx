import { role } from "../../../../utils/config";
import { menu } from "../../../../common/constants/menu";
// import { AuthService } from "../../../core/services/auth.service"
import './Sidebar.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';

function Sidebar(){

    // const userRole = AuthService.getRole() || role.MANAGER;
    const userRole = role.SALES;
    const [activeSection, setActiveSection] = useState(null);

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };
    
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                    Sidebar
                </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu style={{ backgroundImage: 'none', backgroundColor:'#292d31' }}>
                    { menu.map((item, index) => (
                            item.allowedRoles.includes(userRole) && (
                                <NavLink exact to={item.url} activeClassName="activeClicked"  style={{backgroundImage: ''}}>
                                    <CDBSidebarMenuItem icon={item.iconUrl}>{item.label}</CDBSidebarMenuItem>
                                </NavLink>
                            )
                        ))}
                </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div
                    style={{
                    padding: '20px 5px',
                    }}
                > 
                    Sidebar Footer
                </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>

        // <>  
        //     <aside className="sidebar">
        //         { menu.map((item, index) => (
        //             item.allowedRoles.includes(userRole) && (
        //                 <div key = {index}>
        //                     <Link 
        //                         to= {item.url}
        //                         className={`sidebar-section ${activeSection === item.label ? 'active' : ''}`}
        //                         onClick={() => handleSectionClick(item.label)}
        //                         style={{textDecoration: 'none', color:'black'}}
        //                     >
        //                         <img src= {item.iconUrl} alt="Dashboard Icon"/>
        //                         <div className="sidebar-section-title">{item.label}</div>
        //                     </Link>
        //                 </div>
        //             )
        //         ))}
        //     </aside>
        // </>
    )
}

export { Sidebar };