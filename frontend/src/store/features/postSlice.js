import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
import axiosInstance from "../../config/axiosInstance";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const result = await axiosInstance.get("/posts");
  return result.data;
});

export const createPost = createAsyncThunk("post/Create", async (fromData) => {
  const result = await axiosInstance.post("/create/post", fromData);
  return result.data;
});

export const deletePost = createAsyncThunk("post/delete", async (id) => {
  const result = await axiosInstance.delete("/posts/" + id);
  return result;
});

export const likePost = createAsyncThunk(
  "post/Like",
  async ({ id, userId }) => {
    const result = await axiosInstance.patch("/posts/likes/" + id, {
      userId,
    });
    return result;
  }
);

const initialState = {
  data: [],
  loading: "idle",
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data.unshift(action.payload);
      })
      .addCase(deletePost.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = state.data.filter((data) => data._id !== action.meta.arg);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = state.data.map((data) => {
          if (data._id === action.payload.data._id) {
            return action.payload.data;
          }
          return data;
        });
        // console.log(action);
      });
  },
});

export default postSlice.reducer;
