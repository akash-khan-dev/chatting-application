import React from "react";
import "./style.css";

export const GroupList = () => {
  return (
    <>
      <div className="group-list">
        <div className="group-header">
          <h3>Groups List</h3>
        </div>
        <div className="group-item-container">
          <div className="group-item-wrapper">
            <div className="group-img">
              <img src="./images/akash.jpg" alt="man" />
            </div>
            <div className="group-name">
              <h5>Friends Forever</h5>
            </div>
            <div className="group-btn">
              <button>Join</button>
            </div>
          </div>
          <div className="group-item-wrapper">
            <div className="group-img">
              <img src="./images/akash.jpg" alt="man" />
            </div>
            <div className="group-name">
              <h5>Friends Forever</h5>
            </div>
            <div className="group-btn">
              <button>Join</button>
            </div>
          </div>
          <div className="group-item-wrapper">
            <div className="group-img">
              <img src="./images/akash.jpg" alt="man" />
            </div>
            <div className="group-name">
              <h5>Friends Forever</h5>
            </div>
            <div className="group-btn">
              <button>Join</button>
            </div>
          </div>
          <div className="group-item-wrapper">
            <div className="group-img">
              <img src="./images/akash.jpg" alt="man" />
            </div>
            <div className="group-name">
              <h5>Friends Forever</h5>
            </div>
            <div className="group-btn">
              <button>Join</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
