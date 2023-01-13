import axiosInstance from "../config/axiosInstance";

const AuthLogin = async ({ email, password }) => {
  try {
    const result = await axiosInstance.post("/auth/login", {
      email: email,
      password: password,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const AuthRegister = async ({ username, email, password }) => {
  try {
    const result = await axiosInstance.post("/auth/register", {
      username,
      email,
      password,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { AuthLogin, AuthRegister };
