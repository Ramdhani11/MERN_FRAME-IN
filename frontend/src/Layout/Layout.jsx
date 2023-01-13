import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getUser } from "../store/features/userSlice";
import "../styles/layout/Layout.css";

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.data);
  useEffect(() => {
    dispatch(getUser(Cookies.get("id")));
  }, [dispatch]);
  console.log(user);
  return (
    <div className="container-fluid">
      <div className="sidebar">
        <Sidebar user={user} />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
