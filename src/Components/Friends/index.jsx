import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export const Friends = () => {
  const db = getDatabase();
  const user = useSelector((user) => user.logIn.login);
  // all friends get
  const [allFriends, setAllFriends] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "Friends/");
    onValue(starCountRef, (snapshot) => {
      let friensArr = [];
      snapshot.forEach((friens) => {
        if (
          (user.uid === friens.val().senderid &&
            user.uid !== friens.val().reciverid) ||
          (user.uid === friens.val().reciverid &&
            user.uid !== friens.val().senderid)
        ) {
          friensArr.push({ ...friens.val(), id: friens.key });
        }
      });
      setAllFriends(friensArr);
    });
  }, [db, user.uid]);
  // block friend

  const handleBlock = (data) => {
    if (user.uid === data.senderid) {
      set(push(ref(db, "block")), {
        blockname: data.recivername,
        blockid: data.reciverid,
        blockProfile: data.reciverProfile,
        blockedbyname: data.sendername,
        blockedbyid: data.senderid,
        blockbyPfofile: data.currentProfile,
      }).then(() => {
        remove(ref(db, "Friends/" + data.id));
      });
    } else {
      set(push(ref(db, "block")), {
        blockname: data.sendername,
        blockid: data.senderid,
        blockbyPfofile: data.reciverProfile,
        blockedbyname: data.recivername,
        blockedbyid: data.reciverid,
        blockProfile: data.currentProfile,
      }).then(() => {
        remove(ref(db, "Friends/" + data.id));
      });
    }
  };
  // unfriend friend
  const handleUnfriend = (data) => {
    remove(ref(db, "Friends/" + data.id));
  };
  return (
    <>
      <div className="friends">
        <div className="friends-header">
          <h3>Friends</h3>
        </div>
        <div className="friends-container">
          {allFriends.map((item, i) => (
            <div key={i} className="friends-wrapper">
              <div className="friends-img">
                {user.uid === item.reciverid ? (
                  <img
                    src={item.currentProfile || "./images/man.jpg"}
                    onError={(e) => {
                      e.target.src = "./images/man.jpg";
                    }}
                    alt="akash"
                  />
                ) : (
                  <img
                    src={item.reciverProfile || "./images/man.jpg"}
                    onError={(e) => {
                      e.target.src = "./images/man.jpg";
                    }}
                    alt="akash"
                  />
                )}
              </div>
              <div className="friends-name">
                <h5>
                  {user.uid === item.senderid
                    ? item.recivername
                    : item.sendername}
                </h5>
              </div>
              <div className="friends-btn">
                <Button
                  onClick={() => handleBlock(item)}
                  variant="outlined"
                  size="small"
                  className="block"
                >
                  Block
                </Button>
                <Button
                  onClick={() => handleUnfriend(item)}
                  variant="outlined"
                  size="small"
                  className="Unfriend"
                >
                  Unfriend
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
