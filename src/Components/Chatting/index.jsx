import React from "react";
import "./style.css";
import { BsThreeDotsVertical } from "react-icons/bs";

export const Chatting = () => {
  return (
    <>
      <div className="chatting-box">
        <div className="active-user-status">
          <div className="active-user-img-box">
            <div className="active-user-img">
              <picture>
                <img src="./images/chatt.jpg" alt="akash" />
              </picture>
            </div>
          </div>
          <div className="active-user-name">
            <h1>akash</h1>
            <p>Online</p>
          </div>
          <div className="active-user-info">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="message">
          {/* left message start */}
          <div className="left-message">
            <div className="left-text">
              <h6>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi
              </h6>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          {/* left message end */}
          {/* right part start */}
          <div className="right-message">
            <div className="right-text">
              <h6>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi
              </h6>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          {/* right part end */}
          {/* left message start */}
          <div className="left-message">
            <div className="left-img">
              <picture>
                <img src="./images/sun.jpg" alt="chat" />
              </picture>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          {/* left message end */}
          {/* right message start */}
          <div className="right-message">
            <div className="right-img">
              <picture>
                <img src="./images/chatt.jpg" alt="chat" />
              </picture>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          {/* right message end */}
        </div>
      </div>
    </>
  );
};