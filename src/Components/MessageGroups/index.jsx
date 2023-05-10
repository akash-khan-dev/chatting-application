import React from "react";
import "./style.css";
import { Button } from "@mui/material";

const MessageGroups = () => {
  return (
    <>
      <div className="massage-group-list">
        <div className="message-group-header">
          <h3>Message Groups</h3>
        </div>
        <div className="message-group-item-container">
          <div className="message-group-item-wrapper">
            <div className="massege-group-item-img">
              <picture>
                <img src="./images/akash.jpg" alt="man" />
              </picture>
            </div>
            <div className="massege-group-item-name">
              <h5>MERN Stack developer</h5>
              <p>groupTag</p>
            </div>
            <div className="massege-group-item-button">
              <Button variant="contained">Massege</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageGroups;
