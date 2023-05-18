import React, { useState } from "react";
import "./style.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { FaTelegramPlane } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SaveIcon from "@mui/icons-material/Save";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Button } from "@mui/material";
// react html camera photos
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const actions = [
  { icon: <CollectionsBookmarkIcon />, name: "Gallery" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <ShutterSpeedIcon />, name: "....." },
  { icon: <PhotoCameraIcon />, name: "Camera" },
];

export const Chatting = () => {
  const [showCamera, setShowCamera] = useState(false);
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }
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
        {showCamera && (
          <div className="open-camera">
            <RxCross2 onClick={() => setShowCamera(false)} />
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
            />
          </div>
        )}

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
              <ModalImage
                small={"./images/sun.jpg"}
                large={"./images/sun.jpg"}
              />
            </div>
            <p>Today, 2:01pm</p>
          </div>
          {/* left message end */}
          {/* right message start */}
          <div className="right-message">
            <div className="right-img">
              <ModalImage
                className="modal"
                small={"./images/chatt.jpg"}
                large={"./images/chatt.jpg"}
              />
            </div>
            <p>Today, 2:01pm</p>
          </div>
          {/* right message end */}
          {/* left message start */}
          <div className="left-message">
            <audio controls></audio>
            <p>Today, 2:01pm</p>
          </div>
          {/* left message end */}

          {/* right message start */}
          <div className="right-message">
            <audio controls></audio>
            <p>Today, 2:01pm</p>
          </div>
          {/* right message end */}

          {/* left message start */}
          <div className="left-message">
            <video controls></video>
            <p>Today, 2:01pm</p>
          </div>
          {/* left message end */}
        </div>
        <div className="write-box">
          <div className="inputs-box">
            <input type="text" />
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 23, right: 288 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  onClick={() =>
                    action.name === "Camera" ? setShowCamera(true) : false
                  }
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </div>

          <Button className="send-button" variant="contained">
            <FaTelegramPlane />
          </Button>
        </div>
      </div>
    </>
  );
};
