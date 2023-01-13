import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const result = await axiosInstance.get("/users");
  return result.data;
});

export const getUser = createAsyncThunk("user/getUser", async (id) => {
  const result = await axiosInstance.get(`users/${id}`);
  return result.data;
});

const initialState = {
  data: [],
  status: "idle",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action);
        state.data = action.payload;
      });
  },
});

export default userSlice.reducer;
