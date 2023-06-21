import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxGear } from "react-icons/rx";
import { NavLink } from "react-router-dom";

export const SidebarIcon = () => {
  return (
    <div className="icon-container">
      <div>
        <NavLink className="icon" to="/">
          <AiOutlineHome />
        </NavLink>
      </div>
      <div>
        <NavLink className="icon" to="/message">
          <BsFillChatDotsFill />
        </NavLink>
      </div>
      <div className="icon">
        <NavLink className="icon" to="/notification">
          <IoMdNotificationsOutline />
        </NavLink>
      </div>
      <div className="icon">
        <NavLink className="icon" to="/account">
          <RxGear />
        </NavLink>
      </div>
    </div>
  );
};
