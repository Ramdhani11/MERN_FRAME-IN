import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/postSlice";
import userSlice from "./features/userSlice";

const rootReducer = combineReducers({
  posts: postSlice,
  users: userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
