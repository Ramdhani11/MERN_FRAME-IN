import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/auth/Login.css";

const AuthLayout = () => {
  return (
    <div className="container">
      <div className="formLogin">
        <img src={require("../assets/png/tes.png")} alt="LogosForm" />
        <div className="Form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
