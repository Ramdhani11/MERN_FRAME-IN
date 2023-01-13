// import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLogin } from "../api/auth.api";
import Cookies from "js-cookie";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    await AuthLogin({ email, password }).then((result) => {
      const mssg = result.data.mssg;
      if (mssg === "Email anda belum terdaftar") {
        setEmail("");
        return alert(mssg);
      }
      if (mssg === "Password anda salah") {
        setEmail(email);
        setPassword("");
        return alert(mssg);
      }
      setEmail("");
      setPassword("");
      // Cookies.remove("token");
      // Cookies.remove("id");
      Cookies.set("token", result.data.token);
      Cookies.set("id", result.data.user._id);
      alert("Anda telah berhasil login");
      navigate("/Home");
    });
  };
  return (
    <>
      <div className="content-1">
        <h1>Frame.In</h1>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Log In</button>
        </form>
        <div className="line">
          <div />
          <h4>OR</h4>
          <div />
        </div>
      </div>
      <div className="content-2">
        <h4>
          Don't have an account ? <Link to="/sign">Sign Up</Link>
        </h4>
      </div>
    </>
  );
};

export default Login;
