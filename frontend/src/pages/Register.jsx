import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthRegister } from "../api/auth.api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [mssg, setMssg] = useState(false);

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await AuthRegister({ username, email, password });
    alert("Akun ada berhasil dibuat");
    navigate("/");
  };
  return (
    <>
      <div className="content-1">
        <h1>Frame.In</h1>
        <div className="text-header">
          <p>Sign up to see activity from your friends.</p>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="text"
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
          <div className="footer-form">
            <input type="checkbox" required />
            <p>
              By signing up, you agree to our Terms , Privacy Policy and Cookies
              Policy .
            </p>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="content-2">
        <h4>
          Have an account ? <Link to="/">Log In</Link>
        </h4>
      </div>
    </>
  );
};

export default Register;
