import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const BlockUser = () => {
  const db = getDatabase();
  const [blokUser, serBlockUser] = useState([]);
  const user = useSelector((user) => user.logIn.login);

  //  show blocked
  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        if (item.val().blockedbyid === user.uid) {
          blockArr.push({
            id: item.key,
            block: item.val().blockname,
            blockid: item.val().blockid,
          });
        } else {
          blockArr.push({
            id: item.key,
            blockedbyname: item.val().blockedbyname,
            blockedbyid: item.val().blockedbyid,
          });
        }
        // blockArr.push({ ...item.val(), id: item.key });
      });
      serBlockUser(blockArr);
    });
  }, [db]);
  // handle Unblock
  const handleUnblock = (item) => {
    set(push(ref(db, "Friends")), {
      senderid: item.blockid,
      sendername: item.block,
      reciverid: user.uid,
      recivername: user.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  return (
    <>
      <div className="block-user">
        <div className="block-user-header">
          <h5>Blocked User</h5>
        </div>
        <div className="block-user-container">
          {blokUser.map((item, i) => (
            <div key={i} className="block-user-wrapper">
              <div className="block-user-img">
                <img src="./images/akash.jpg" alt="akash" />
              </div>
              <div className="block-user-name">
                <h5>{item.block}</h5>
                <h5>{item.blockedbyname}</h5>
              </div>
              <div className="block-user-btn">
                {item.blockid && (
                  <Button onClick={() => handleUnblock(item)}>unblock</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockUser;
