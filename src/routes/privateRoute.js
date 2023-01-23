import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


// screen if you're not yet authenticated.
export const PrivateRoute = ({ allowedRoles, ...rest }) => {

  const location = useLocation();
  const token = useSelector((state) => state.token || "");
  const user = useSelector((state) => state.user || {});
  const actualUrl = location.pathname + location.search;

  const isAuthenticated = (token && token != "") || (user && user._id);
  const isRoleEnabled = (!allowedRoles || allowedRoles.length == 0) || (allowedRoles && allowedRoles.includes(user.cd_privilege));

  return isAuthenticated && isRoleEnabled ? <Outlet /> : isAuthenticated ? <Navigate to={actualUrl}/> : <Navigate to="/login"/>;
};
