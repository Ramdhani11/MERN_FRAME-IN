import Cookies from "js-cookie";
const Auth = () => {
  if (Cookies.get("token") && Cookies.get("id")) return true;
  return false;
};
const LogoutAuth = ({ navigate }) => {
  Cookies.remove("token");
  Cookies.remove("id");
  alert("Anda berhasil logout");
  navigate("/");
};

export { Auth, LogoutAuth };
