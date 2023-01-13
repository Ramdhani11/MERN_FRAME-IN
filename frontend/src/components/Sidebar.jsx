import React from "react";
import { Side } from "../data/Side";
import { LogoutAuth } from "../config/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import close from "../assets/svg/close_FILL0_wght400_GRAD0_opsz48.svg";
import imagee from "../assets/svg/image_FILL0_wght400_GRAD0_opsz48.svg";
import trash from "../assets/svg/delete_FILL0_wght400_GRAD0_opsz48.svg";
import { useDispatch } from "react-redux";
import { createPost } from "../store/features/postSlice";
import Cookies from "js-cookie";
import profile from "../assets/png/default.png";

const Sidebar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [body, setBody] = useState("");
  const [imu, setImu] = useState(null);
  const [image, setImage] = useState(null);

  const changeHandler = (e) => {
    let upload = e.target.files[0];
    setImage(URL.createObjectURL(upload));
    setImu(upload);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", imu);
    formData.append("body", body);
    formData.append("userId", Cookies.get("id"));
    dispatch(createPost(formData));
    setModal(!modal);
    setBody("");
    setImu(null);
    setImage(null);
  };

  return (
    <>
      <h1>Frame.in</h1>
      <div className="container-side">
        <ul>
          {Side.map((data, index) => {
            const pathUrl = window.location.pathname;
            const { path, icon, activeIcon, name } = data;
            return (
              <li className="lists" key={index}>
                {pathUrl === path ? (
                  <>
                    <img className="image" src={activeIcon} alt="home" />
                    <a href={path} className="link" style={{ fontWeight: 600 }}>
                      {name}
                    </a>
                  </>
                ) : (
                  <>
                    <img
                      className="image"
                      src={name !== "Profile" ? icon : profile}
                      alt="home"
                    />
                    {name === "Create" ? (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => setModal(!modal)}
                        className="link"
                      >
                        {name}
                      </div>
                    ) : (
                      <a href={path} className="link">
                        {name}
                      </a>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <h4 onClick={() => LogoutAuth({ navigate })}>Logout</h4>
      </div>
      <div
        className={modal ? "modalActive" : "modal"}
        // onClick={() => setModal(!modal)}
        onDoubleClick={() => setModal(!modal)}
      >
        <img
          src={close}
          alt="close"
          className="close"
          onClick={() => setModal(!modal)}
        />
        <div className={image !== null ? "post-card active" : "post-card"}>
          <div className="header">Create Post</div>
          <div className="responeIMG">
            {image !== null ? (
              <div className="popupIMG">
                <img style={{ width: "100%" }} src={image} alt="" />
              </div>
            ) : null}
            <form onSubmit={submitHandler}>
              <div className="content">
                <div className="user">
                  <div className="photo">
                    <img
                      style={{
                        width: 40,
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        marginRight: 10,
                      }}
                      src={user.picturePath === "" ? profile : user.picturePath}
                      alt=""
                    />
                    <h5>{user.username}</h5>
                  </div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Write a caption"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="footer">
                {image !== null ? (
                  <label
                    htmlFor="foto"
                    className="delete"
                    onClick={() => setImage(null)}
                  >
                    <img src={trash} alt="" />
                  </label>
                ) : (
                  <>
                    <label htmlFor="foto">
                      <img src={imagee} alt="" />
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      name=""
                      id="foto"
                      onChange={changeHandler}
                    />
                  </>
                )}

                <button type="submit">Share</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
