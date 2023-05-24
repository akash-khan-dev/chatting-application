import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { FaTelegramPlane } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CollectionsIcon from "@mui/icons-material/Collections";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Button } from "@mui/material";
// react html camera photos
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import {
  getStorage,
  ref as storeRef,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
const actions = [
  { icon: <SaveIcon />, name: "Save" },
  { icon: <KeyboardVoiceIcon />, name: "Voice" },
  { icon: <CollectionsIcon />, name: "Gallery" },
  { icon: <PhotoCameraIcon />, name: "Camera" },
];

export const Chatting = () => {
  const storage = getStorage();

  const db = getDatabase();
  const [msg, setMsg] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const user = useSelector((user) => user.logIn.login);
  const activeChangeName = useSelector((user) => user.active.active);
  const [showCamera, setShowCamera] = useState(false);
  const chooseFile = useRef();
  const showMorefundamantal = (name) => {
    if (name === "Camera") {
      setShowCamera(true);
    } else if (name === "Gallery") {
      chooseFile.current.click();
    }
  };

  // handleSendMessage
  const handleSendMessage = () => {
    if (activeChangeName.status === "single") {
      set(push(ref(db, "singleMsg")), {
        whosendname: user.displayName,
        whosendid: user.uid,
        whorecivename: activeChangeName.name,
        whoreciveid: activeChangeName.id,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }- ${new Date().getDate()} ${new Date().getHours()}: ${new Date().getMinutes()}`,
      });
    } else {
      console.log("aita group message er jonno");
    }
  };
  // get a message in database
  useEffect(() => {
    onValue(ref(db, "singleMsg"), (snapshot) => {
      let singleMsgArr = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().whosendid &&
            item.val().whoreciveid === activeChangeName.id) ||
          (user.uid === item.val().whoreciveid &&
            item.val().whosendid === activeChangeName.id)
        ) {
          singleMsgArr.push(item.val());
        }
        setAllMsg(singleMsgArr);
      });
    });
  }, [activeChangeName.id]);

  //send a capture img

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    // console.log(dataUri);
    const storageRef = storeRef(
      storage,
      `CaptureSendImg/ ${user.displayName} = ${user.uid}/ ${uuidv4()}`
    );
    uploadString(storageRef, dataUri, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singleMsg")), {
          whosendname: user.displayName,
          whosendid: user.uid,
          whorecivename: activeChangeName.name,
          whoreciveid: activeChangeName.id,
          img: downloadURL,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }- ${new Date().getDate()} ${new Date().getHours()}: ${new Date().getMinutes()}`,
        }).then(() => {
          setShowCamera(false);
        });
      });
    });
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
            <h1>{activeChangeName?.name}</h1>
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
          {activeChangeName.status === "single"
            ? allMsg.map((item) =>
                item.whosendid === user.uid ? (
                  item.msg ? (
                    <>
                      <div className="right-message">
                        <div className="right-text">
                          <h6>{item.msg}</h6>
                        </div>
                        <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                      </div>
                    </>
                  ) : (
                    <div className="right-message">
                      <div className="right-img">
                        <ModalImage
                          className="modal"
                          small={item.img}
                          large={item.img}
                        />
                      </div>
                      <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                    </div>
                  )
                ) : item.msg ? (
                  <>
                    <div className="left-message">
                      <div className="left-text">
                        <h6>{item.msg}</h6>
                      </div>
                      <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                    </div>
                  </>
                ) : (
                  <div className="left-message">
                    <div className="left-img">
                      <ModalImage small={item.img} large={item.img} />
                    </div>
                    <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                )
              )
            : "group"}

          {/* left message start */}
          {/* <div className="left-message">
            <div className="left-img">
              <ModalImage
                small={"./images/sun.jpg"}
                large={"./images/sun.jpg"}
              />
            </div>
            <p>Today, 2:01pm</p>
          </div> */}
          {/* left message end */}
          {/* right message start */}
          {/* <div className="right-message">
            <div className="right-img">
              <ModalImage
                className="modal"
                small={"./images/chatt.jpg"}
                large={"./images/chatt.jpg"}
              />
            </div>
            <p>Today, 2:01pm</p>
          </div> */}
          {/* right message end */}
          {/* left message start */}
          {/* <div className="left-message">
            <audio controls></audio>
            <p>Today, 2:01pm</p>
          </div> */}
          {/* left message end */}

          {/* right message start */}
          {/* <div className="right-message">
            <audio controls></audio>
            <p>Today, 2:01pm</p>
          </div> */}
          {/* right message end */}

          {/* left message start */}
          {/* <div className="left-message">
            <video controls></video>
            <p>Today, 2:01pm</p>
          </div> */}
          {/* left message end */}
        </div>
        <div className="write-box">
          <div className="inputs-box">
            <input onChange={(e) => setMsg(e.target.value)} type="text" />
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 2, right: -5 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  onClick={() => showMorefundamantal(action.name)}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </div>
          <input hidden type="file" ref={chooseFile} />

          <Button
            onClick={handleSendMessage}
            className="send-button"
            variant="contained"
          >
            <FaTelegramPlane />
          </Button>
        </div>
      </div>
    </>
  );
};
