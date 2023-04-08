import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { BiArrowBack } from "react-icons/bi";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const db = getDatabase();
  const user = useSelector((user) => user.logIn.login);
  const [myGroup, setMyGroup] = useState([]);
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
