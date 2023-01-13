import React from "react";
import like from "../assets/svg/like.svg";
import liked from "../assets/svg/liked.svg";
import chat from "../assets/svg/chat.svg";
import bookmark from "../assets/svg/bookmark.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts, likePost } from "../store/features/postSlice";
import load from "../assets/svg/load.svg";
import trash from "../assets/svg/delete_FILL0_wght400_GRAD0_opsz48.svg";
import Cookies from "js-cookie";
import profile from "../assets/png/default.png";

const Card = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const loading = useSelector((state) => state.posts.loading);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  const likesHandler = ({ id, userId }) => {
    dispatch(likePost({ id, userId }));
  };
  // <div
  //   style={{
  //     position: "fixed",
  //     // backgroundColor: "red",
  //     zIndex: "4",
  //     top: "30%",
  //     right: "50%",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   }}
  // >
  //   <img src={load} alt="" />
  // </div>
  return loading === "loading" ? (
    <div
      style={{
        position: "fixed",
        zIndex: "4",
        top: "30%",
        right: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={load} alt="" />
    </div>
  ) : (
    posts.map((post, index) => (
      <div className="card" key={index}>
        <div className="card-header">
          <div className="profile">
            <img
              src={post.user.photo === "" ? profile : post.user.photo}
              alt=""
            />
          </div>
          <h5>{post.user.username}</h5>
          {post.user.userId === Cookies.get("id") ? (
            <div className="delete">
              <img onClick={() => deleteHandler(post._id)} src={trash} alt="" />
            </div>
          ) : null}
        </div>
        {post.picturePost !== "" ? (
          <>
            <div className="card-content">
              <img src={post.picturePost} alt="" />
            </div>
            <div className="card-footer">
              <div className="icons">
                <div>
                  <img
                    onClick={() =>
                      likesHandler({ id: post._id, userId: post.user.userId })
                    }
                    style={{ width: 25, cursor: "pointer" }}
                    src={post.likes.length > 0 ? liked : like}
                    alt=""
                  />
                  <img style={{ width: 25 }} id="chat" src={chat} alt="" />
                </div>
                <img
                  className="book"
                  style={{ width: 25 }}
                  src={bookmark}
                  alt=""
                />
              </div>
              <div className="text-items">
                <h5>{post.likes.length} likes</h5>
                <p>
                  <span>{post.user.username} </span>
                  {post.body}
                </p>
                <span>View all comments</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card-footer">
              <div className="text-items noimg">
                <p>{post.body}</p>
                {/* <h5>123 likes</h5>
            <span>View all comments</span> */}
              </div>
              <div className="icons noimg" style={{ marginTop: 10 }}>
                <div>
                  <div className="likescount">
                    <img
                      onClick={() =>
                        likesHandler({ id: post._id, userId: post.user.userId })
                      }
                      style={{ width: 25, cursor: "pointer" }}
                      src={post.likes.length > 0 ? liked : like}
                      alt=""
                    />
                    <h5>{post.likes.length} likes</h5>
                  </div>
                  <img id="chat" style={{ width: 25 }} src={chat} alt="" />
                </div>
                <img
                  className="book"
                  style={{ width: 25 }}
                  src={bookmark}
                  alt=""
                />
              </div>
            </div>
          </>
        )}
      </div>
    ))
  );
};

export default Card;
