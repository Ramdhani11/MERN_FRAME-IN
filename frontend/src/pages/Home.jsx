import React from "react";
import Card from "../components/Card";

// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { LogoutAuth } from "../config/Auth";
const Home = () => {
  // const navigate = useNavigate();
  return (
    <div className="home">
      <div className="main-content">
        {/* <Header /> */}
        <Card />
      </div>
      <div className="informasi"></div>
    </div>
  );
};

export default Home;
