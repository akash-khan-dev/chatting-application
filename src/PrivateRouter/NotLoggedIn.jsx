import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedIn() {
  const users = useSelector((user) => user.logIn.login);
  return users ? <Navigate to="/" /> : <Outlet />;
}
