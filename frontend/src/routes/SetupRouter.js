import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import ProtectedRouter from "./ProtectedRouter";
const SetupRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRouter />}>
          <Route index element={<Login />} />
          <Route path="/sign" element={<Register />} />
        </Route>
        <Route path="/Home" element={<PrivateRouter />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default SetupRouter;
