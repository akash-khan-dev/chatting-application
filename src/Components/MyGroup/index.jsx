import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { BiArrowBack } from "react-icons/bi";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const db = getDatabase();
  const user = useSelector((user) => user.logIn.login);
  const [myGroup, setMyGroup] = useState([]);
  const [joinGroup, setJoinGroup] = useState([]);
  const [showBack, setShowBack] = useState(false);
  // get all groups
  useEffect(() => {
    const starCountRef = ref(db, "Groups");
    onValue(starCountRef, (snapshot) => {
      let groupArr = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().adminid) {
          groupArr.push({ ...item.val(), id: item.key });
        }
      });
      setMyGroup(groupArr);
    });
  }, [db, user.uid]);
  // show all request
  const handleShowRequest = (data) => {
    setShowBack(true);
    const starCountRef = ref(db, "JoinGroupRequest");
    onValue(starCountRef, (snapshot) => {
      let joinArr = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().adminid && item.val().groupid === data.id) {
          joinArr.push({ ...item.val(), id: item.key });
        }
      });
      setJoinGroup(joinArr);
    });
  };
  // group accept
  const handleGroupAccept = (data) => {
    set(push(ref(db, "groupmember")), {
      adminid: data.adminid,
      groupid: data.groupid,
      userid: data.userid,
      groupname: data.groupname,
      adminname: data.adminname,
      username: data.username,
    }).then(() => {
      remove(ref(db, "JoinGroupRequest/" + data.id));
    });
  };
  return (
    <>
      <div className="my-group">
        <div className="my-group-header">
          <h5>My Groups</h5>
        </div>
        <div className="my-group-container">
          {showBack && (
            <div className="show-back-icon" onClick={() => setShowBack(false)}>
              <BiArrowBack />
            </div>
          )}
          {myGroup.length === 0 ? (
            <Alert severity="error">No Groups Create yet</Alert>
          ) : showBack ? (
            joinGroup.length === 0 ? (
              <Alert severity="error">No Request yet</Alert>
            ) : (
              joinGroup.map((item, i) => (
                <div key={i} className="my-group-wrapper">
                  <div className="my-group-img">
                    <img src="./images/akash.jpg" alt="akash" />
                  </div>
                  <div className="my-group-name">
                    <h5>{item.username}</h5>
                  </div>
                  <div className="friend-request-btn">
                    <Button
                      onClick={() => handleGroupAccept(item)}
                      variant="contained"
                      size="small"
                      className="accept"
                    >
                      accept
                    </Button>
                    <Button variant="contained" size="small" className="reject">
                      reject
                    </Button>
                  </div>
                </div>
              ))
            )
          ) : (
            myGroup.map((item, i) => (
              <div key={i} className="my-group-wrapper">
                <div className="my-group-img">
                  <img src="./images/akash.jpg" alt="akash" />
                </div>
                <div className="my-group-name">
                  <h5>{item.groupname}</h5>
                  <p>Admin:{item.adminname}</p>
                  <span>{item.groupTag}</span>
                </div>
                <div className="friend-request-btn">
                  <Button variant="contained" size="small" className="accept">
                    Info
                  </Button>
                  <Button
                    onClick={() => handleShowRequest(item)}
                    variant="contained"
                    size="small"
                    className="remove"
                  >
                    request
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyGroup;
