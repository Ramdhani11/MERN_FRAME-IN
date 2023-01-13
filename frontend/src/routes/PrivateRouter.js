import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Auth } from "../config/Auth";
import Layout from "../Layout/Layout";

const PrivateRouter = () => {
  if (Auth()) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
  return <Navigate to={"/"} replace />;
};

export default PrivateRouter;
