import React from "react";
import "./style.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
export const Notification = () => {
  return (
    <>
      <div className="notification-box">
        <div className="notification-wrapper">
          <div className="notification-item">
            <div className="notification-icon">
              <NotificationsNoneIcon />
            </div>
            <div className="notification-text">
              <p>
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
