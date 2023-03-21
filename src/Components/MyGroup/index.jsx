import React from "react";
import "./style.css";

const MyGroup = () => {
  return (
    <>
      <div className="my-group">
        <div className="my-group-header">
          <h5>My Groups</h5>
        </div>
        <div className="my-group-container">
          <div className="my-group-wrapper">
            <div className="my-group-img">
              <img src="./images/akash.jpg" alt="akash" />
            </div>
            <div className="my-group-name">
              <h5>Tejeshwini C</h5>
            </div>
            <div className="my-group-date">
              <p>Today, 8:56pm</p>
            </div>
          </div>
          <div className="my-group-wrapper">
            <div className="my-group-img">
              <img src="./images/akash.jpg" alt="akash" />
            </div>
            <div className="my-group-name">
              <h5>Tejeshwini C</h5>
            </div>
            <div className="my-group-date">
              <p>Today, 2:31pm</p>
            </div>
          </div>
          <div className="my-group-wrapper">
            <div className="my-group-img">
              <img src="./images/akash.jpg" alt="akash" />
            </div>
            <div className="my-group-name">
              <h5>Tejeshwini C</h5>
            </div>
            <div className="my-group-date">
              <p>Yesterday, 6:22pm</p>
            </div>
          </div>
          <div className="my-group-wrapper">
            <div className="my-group-img">
              <img src="./images/akash.jpg" alt="akash" />
            </div>
            <div className="my-group-name">
              <h5>Tejeshwini C</h5>
            </div>
            <div className="my-group-date">
              <p>Today, 12:22pm</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGroup;
