import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';

export default function ProtectedRouter() {
  const checkLogin = useSelector((state) => state.auth?.isLoggedIn);

  return checkLogin ? <Outlet /> : <Navigate to="/login" replace />;
}
