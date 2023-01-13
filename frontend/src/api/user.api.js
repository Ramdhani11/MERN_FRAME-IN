import axiosInstance from "../config/axiosInstance";

export const getUser = async (id, cb) => {
  try {
    const result = await axiosInstance.get("/users/" + id);
    return cb(result.data);
  } catch (error) {
    console.log(error);
  }
};
