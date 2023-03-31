import React, { useEffect, useState } from "react";
import "./style.css";
// import { AiOutlinePlus } from "react-icons/ai";
// import { RxCross2 } from "react-icons/rx";
// import { TiTick } from "react-icons/ti";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  const [users, setUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [frnd, setFrnd] = useState([]);
  const user = useSelector((user) => user.logIn.login);
  //  show user
  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((userList) => {
        if (user.uid !== userList.key) {
          users.push({ ...userList.val(), id: userList.key });
        }
      });
      setUsers(users);
    });
  }, []);

  // send request
  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendsReuquest")), {
      sendername: user.displayName,
      senderid: user.uid,
      recivername: data.username,
      reciverid: data.id,
    });
  };

  // show friendRequest
  useEffect(() => {
    const starCountRef = ref(db, "friendsReuquest");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().reciverid + item.val().senderid);
      });
      setFriendList(reqArr);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "Friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        frndArr.push(item.val().reciverid + item.val().senderid);
      });
      setFrnd(frndArr);
    });
  }, []);

  // cancle request
  let [cancle, setCancle] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "friendsReuquest");
    onValue(starCountRef, (snapshot) => {
      let cancleArr = [];
      snapshot.forEach((item) => {
        cancleArr.push({ ...item.val(), id: item.key });
        setCancle(cancleArr);
      });
    });
  }, []);
  const handleCancleRequest = (data) => {
    data.map((data) => remove(ref(db, "friendsReuquest/" + data.id)));
  };

  return (
    <>
      <div className="user-list">
        <div className="user-list-header">
          <h3>User List</h3>
        </div>
        <div className="user-list-container">
          {users.map((item, i) => (
            <div key={i} className="user-list-wrapper">
              <div className="user-list-img">
                <img src="./images/akash.jpg" alt="akash" />
              </div>
              <div className="user-list-name">
                <h5>{item.username}</h5>
              </div>
              {frnd.includes(item.id + user.uid) ||
              frnd.includes(user.uid + item.id) ? (
                <Button
                  variant="outlined"
                  size="small"
                  className="user-list-btn"
                >
                  friend
                </Button>
              ) : friendList.includes(item.id + user.uid) ||
                friendList.includes(user.uid + item.id) ? (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleCancleRequest(cancle)}
                  className="user-list-btn"
                >
                  cancle
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleFriendRequest(item)}
                  className="user-list-btn"
                >
                  add
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
