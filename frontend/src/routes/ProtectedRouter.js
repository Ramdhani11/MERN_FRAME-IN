import React from "react";
import { Outlet } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";

const ProtectedRouter = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default ProtectedRouter;
