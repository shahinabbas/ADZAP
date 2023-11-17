import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const isAdmin = user.is_admin;

  return user && isAdmin ? <>{children}</> : <Navigate to="/adminlogin" />;
};
export default PrivateRoute;


const UserRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.is_authenticated;
  return user && isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export { UserRoute };
