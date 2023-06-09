import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { FaTelegramPlane } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CollectionsIcon from "@mui/icons-material/Collections";
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
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { AudioRecorder } from "react-audio-voice-recorder";
import { v4 as uuidv4 } from "uuid";
import Emoji from "../Emoji";

export const Chatting = () => {
  const actions = [
    {
      icon: <CollectionsIcon />,
      name: "Gallery",
    },
    { icon: <PhotoCameraIcon />, name: "Camera" },
  ];

  const storage = getStorage();
  const db = getDatabase();
  const [msg, setMsg] = useState("");
  const [grpInput, setGrpInput] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [groupMsg, setGroupMsg] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showAudio, setShowAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [blobUrl, setBlobUrl] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const user = useSelector((user) => user.logIn.login);
  const activeChatName = useSelector((user) => user.active.active);
  const [showCamera, setShowCamera] = useState(false);
  const chooseFile = useRef();
  const scrollMsg = useRef(null);
  const showMorefundamantal = (name) => {
    if (name === "Camera") {
      setShowCamera(true);
    } else if (name === "Gallery") {
      chooseFile.current.click();
    }
  };

  // for handleSendMessage

  const handleSendMessage = () => {
    if (activeChatName?.status === "single") {
      set(push(ref(db, "singleMsg")), {
        whosendname: user.displayName,
        whosendid: user.uid,
        whorecivename: activeChatName?.name,
        whoreciveid: activeChatName?.id,
        msg: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }- ${new Date().getDate()} ${new Date().getHours()}: ${new Date().getMinutes()}`,
      }).then(() => {
        setMsg("");
      });
    } else {
      set(push(ref(db, "groupMsg")), {
        whosendname: user.displayName,
        whosendid: user.uid,
        whorecivename: activeChatName?.name,
        whoreciveid: activeChatName?.id,
        msg: msg,
        adminid: activeChatName?.adminid,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }- ${new Date().getDate()} ${new Date().getHours()}: ${new Date().getMinutes()}`,
      }).then(() => {
        setMsg("");
      });
    }
  };
  // get a single message in database
  useEffect(() => {
    onValue(ref(db, "singleMsg"), (snapshot) => {
      let singleMsgArr = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().whosendid &&
            item.val().whoreciveid === activeChatName?.id) ||
          (user.uid === item.val().whoreciveid &&
            item.val().whosendid === activeChatName?.id)
        ) {
          singleMsgArr.push(item.val());
        }
        setAllMsg(singleMsgArr);
      });
    });
  }, [activeChatName?.id]);

  // for group members information
  useEffect(() => {
    onValue(ref(db, "groupmember/"), (snapshot) => {
      let groupMembersArr = [];
      snapshot.forEach((item) => {
        groupMembersArr.push(item.val().groupid + item.val().userid);
      });
      setGroupMembers(groupMembersArr);
    });
  }, [db]);

  // get a group message in database
  useEffect(() => {
    onValue(ref(db, "groupMsg"), (snapshot) => {
      let groupMsgArr = [];
      snapshot.forEach((item) => {
        groupMsgArr.push(item.val());
      });
      setGroupMsg(groupMsgArr);
    });
  }, [activeChatName?.id]);

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
          whorecivename: activeChatName?.name,
          whoreciveid: activeChatName?.id,
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
  // send for img functionality
  const [progressBar, setProgressBar] = useState("");
  const handleImgSend = (e) => {
    const imgFile = e.target.files[0].name;
    const storageRef = storeRef(
      storage,
      `${user.displayName} = SendImg/ ${imgFile}`
    );

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMsg")), {
            whosendname: user.displayName,
            whosendid: user.uid,
            whorecivename: activeChatName?.name,
            whoreciveid: activeChatName?.id,
            img: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }- ${new Date().getDate()} ${new Date().getHours()}: ${new Date().getMinutes()}`,
          });
        });
      }
    );
  };

  // handleMsgSendInterBtn
  const handleMsgSendInterBtn = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // for voice messages
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    setBlobUrl(blob);
  };

  // for voice record send
  const handleSendVoiceRecord = () => {
    const storageRef = storeRef(storage, audioUrl);

    uploadBytes(storageRef, blobUrl)
      .then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          set(push(ref(db, "singleMsg")), {
            whosendname: user.displayName,
            whosendid: user.uid,
            whorecivename: activeChatName?.name,
            whoreciveid: activeChatName?.id,
            voice: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }- ${new Date().getDate()} ${new Date().getHours()}: ${new Date().getMinutes()}`,
          });
        });
      })
      .then(() => {
        setAudioUrl("");
      });
  };

  // for Emoji Select
  const handleEmojiSelect = (emoji) => {
    setMsg(msg + emoji.emoji);
    setGrpInput(msg + emoji.emoji);
  };

  //  for scrollMsg
  useEffect(() => {
    scrollMsg.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allMsg]);

  // for show online
  const [showaOnline, setShowOnline] = useState([]);
  useEffect(() => {
    onValue(ref(db, "Online/"), (snapshot) => {
      let OnlineArr = [];
      snapshot.forEach((item) => {
        OnlineArr.push(item.val().userid);
      });
      setShowOnline(OnlineArr);
    });
  }, []);

  console.log("showonline", showaOnline);
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
            <h1>{activeChatName?.name}</h1>
            {showaOnline.includes(activeChatName?.id) ? "Online" : "Offline"}
          </div>
          <div className="active-user-info">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="message">
          {activeChatName?.status === "single"
            ? allMsg.map((item) => (
                <div ref={scrollMsg}>
                  {item.whosendid === user.uid ? (
                    item.msg ? (
                      <>
                        <div className="right-message">
                          <div className="right-text">
                            <h6>{item.msg}</h6>
                          </div>
                          <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div>
                      </>
                    ) : item.img ? (
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
                    ) : (
                      <div className="right-message">
                        <audio controls src={item.voice}></audio>
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
                  ) : item.img ? (
                    <div className="left-message">
                      <div className="left-img">
                        <ModalImage small={item.img} large={item.img} />
                      </div>
                      <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                    </div>
                  ) : (
                    <div className="left-message">
                      <audio controls src={item.voice}></audio>
                      <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                    </div>
                  )}
                </div>
              ))
            : user.uid === activeChatName?.adminid ||
              groupMembers.includes(activeChatName?.id + user.uid)
            ? groupMsg.map((item) => (
                <div>
                  {item.whosendid === user.uid
                    ? item.whoreciveid === activeChatName?.id && (
                        <div className="right-message">
                          <div className="right-text">
                            <h6>{item.msg}</h6>
                          </div>
                          <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div>
                      )
                    : item.whoreciveid === activeChatName?.id && (
                        <div className="left-message">
                          <div className="left-text">
                            <h6>{item.msg}</h6>
                          </div>
                          <p>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div>
                      )}
                </div>
              ))
            : "nai"}
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
        {activeChatName?.status === "single" ? (
          <div className="div">
            {!showAudio & !audioUrl && (
              <div className="write-box">
                <div className="inputs-box">
                  <Emoji
                    handleEmojiSelect={handleEmojiSelect}
                    setOpenEmoji={setOpenEmoji}
                    openEmoji={openEmoji}
                  />

                  <input
                    onKeyUp={handleMsgSendInterBtn}
                    onChange={(e) => setMsg(e.target.value)}
                    type="text"
                    value={msg}
                  />
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

                  <input
                    hidden
                    onChange={handleImgSend}
                    type="file"
                    ref={chooseFile}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="send-button"
                  variant="contained"
                >
                  <FaTelegramPlane />
                </Button>
              </div>
            )}
            <div
              className="audio-record"
              onClick={() => setShowAudio(!showAudio)}
            >
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                downloadOnSavePress={true}
                downloadFileExtension="mp3"
              />
            </div>
            {audioUrl && (
              <div className="audio-sound">
                <audio controls src={audioUrl}></audio>

                <div
                  onClick={handleSendVoiceRecord}
                  className="voice-button"
                  variant="contained"
                >
                  <SendIcon />
                </div>
                <div
                  onClick={() => setAudioUrl("")}
                  className="voice-button"
                  variant="contained"
                >
                  <DeleteIcon />
                </div>
              </div>
            )}
          </div>
        ) : user.uid === activeChatName?.adminid ||
          groupMembers.includes(activeChatName?.id + user.uid) ? (
          <div className="div">
            {!showAudio & !audioUrl && (
              <div className="write-box">
                <div className="inputs-box">
                  <Emoji
                    handleEmojiSelect={handleEmojiSelect}
                    setOpenEmoji={setOpenEmoji}
                    openEmoji={openEmoji}
                  />

                  <input
                    onKeyUp={handleMsgSendInterBtn}
                    onChange={(e) => setGrpInput(e.target.value)}
                    type="text"
                    value={grpInput}
                  />
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

                  <input
                    hidden
                    onChange={handleImgSend}
                    type="file"
                    ref={chooseFile}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="send-button"
                  variant="contained"
                >
                  <FaTelegramPlane />
                </Button>
              </div>
            )}
            <div
              className="audio-record"
              onClick={() => setShowAudio(!showAudio)}
            >
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                downloadOnSavePress={true}
                downloadFileExtension="mp3"
              />
            </div>
            {audioUrl && (
              <div className="audio-sound">
                <audio controls src={audioUrl}></audio>

                <div
                  onClick={handleSendVoiceRecord}
                  className="voice-button"
                  variant="contained"
                >
                  <SendIcon />
                </div>
                <div
                  onClick={() => setAudioUrl("")}
                  className="voice-button"
                  variant="contained"
                >
                  <DeleteIcon />
                </div>
              </div>
            )}
          </div>
        ) : (
          "nai"
        )}
      </div>
    </>
  );
};
