import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../Pages/Login/Login";

export default function LoggedIn() {
  const users = useSelector((user) => user.logIn.login);
  return users ? <Outlet /> : <Login />;
}
