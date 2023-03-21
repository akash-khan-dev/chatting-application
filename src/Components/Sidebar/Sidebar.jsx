import React from "react";
import "./Sidebar.css";
import { SidebarIcon } from "./SidebarIcon";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../Feature/UserSlice/UserSlice";
import { getAuth, signOut } from "firebase/auth";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { PopUp } from "../Modal/PopUp";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [open, setOpen] = React.useState(false);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("users");
      dispatch(LoginUser(null));
    });
  };
  const users = useSelector((user) => user.logIn.login);

  const handlePopUp = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className="sidebar-box">
        <div>
          <div onClick={handlePopUp} className="sidebar-img">
            {users.photoURL ? (
              <img src={users.photoURL} alt="man" />
            ) : (
              <img src="./images/man.jpg" alt="man" />
            )}

            <div className="sidebar-overlay">
              <AiOutlineCloudDownload />
            </div>
          </div>
          <div className="user-name">
            <h4>{users.displayName}</h4>
          </div>
        </div>
        <div className="sidebar-icon">
          <SidebarIcon />
        </div>
        <div onClick={handleLogOut} className="sidebar-logout">
          <BiLogOut />
        </div>
      </div>
      <PopUp open={open} setOpen={setOpen} />
    </div>
  );
};
