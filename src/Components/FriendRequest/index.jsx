import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./style.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
export const FriendRequest = () => {
  const user = useSelector((user) => user.logIn.login);
  let [friends, setFriends] = useState([]);
  const db = getDatabase();
  // show request
  useEffect(() => {
    const starCountRef = ref(db, "friendsReuquest");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverid === user.uid) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(frndArr);
    });
  }, [db, user.uid]);

  // accecpt request
  const handleAcceptRequest = (data) => {
    set(push(ref(db, "Friends")), {
      ...data,
      currentProfile: user.photoURL,
    }).then(() => {
      remove(ref(db, "friendsReuquest/" + data.id));
    });
  };

  // reject request
  const handleRemove = (data) => {
    remove(ref(db, "friendsReuquest/" + data.id));
  };

  return (
    <>
      <div className="friend-request">
        <div className="friend-request-header">
          <h5>Friend Request</h5>
        </div>
        <div className="friend-request-container">
          {friends &&
            friends.map((item, i) => (
              <div key={i} className="friend-request-wrapper">
                <div className="friend-request-img">
                  <img src={item.profile || "./images/man.jpg"} alt="man" />
                </div>
                <div className="friend-request-name">
                  <h5>{item.sendername}</h5>
                </div>
                <div className="friend-request-btn">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAcceptRequest(item)}
                    className="accept"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleRemove(item)}
                    className="remove"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
