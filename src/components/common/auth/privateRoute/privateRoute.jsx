import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../../../services/auth/loginService';

const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const userRoles = AuthService.getUserRoles(); // Retrieve user roles from local storage

  // Ensure userRoles is an array
  const parsedUserRoles = Array.isArray(userRoles) ? userRoles : JSON.parse(userRoles || '[]');
  
  console.log('User Roles:', parsedUserRoles);
  console.log('Allowed Roles:', allowedRoles);

  const hasAccess = allowedRoles.some(role => parsedUserRoles.includes(role));

  return hasAccess ? Component : <Navigate to="/no-access" replace />;
};

export default PrivateRoute;
