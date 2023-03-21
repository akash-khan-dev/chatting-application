import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxGear } from "react-icons/rx";

export const SidebarIcon = () => {
  return (
    <div className="icon-container">
      <div className="icon">
        <AiOutlineHome />
      </div>
      <div className="icon">
        <BsFillChatDotsFill />
      </div>
      <div className="icon">
        <IoMdNotificationsOutline />
      </div>
      <div className="icon">
        <RxGear />
      </div>
    </div>
  );
};
