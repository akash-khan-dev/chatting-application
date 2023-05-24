import React, { useEffect, useRef, useState } from "react";
import "./style.css";

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
import { getStorage, ref as Ref, getDownloadURL } from "firebase/storage";
import { Search } from "../Search";

const UserList = () => {
  const storage = getStorage();
  const db = getDatabase();
  const [users, setUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [frnd, setFrnd] = useState([]);
  const [cancle, setCancle] = useState([]);
  const [search, setSearch] = useState("");

  const user = useSelector((user) => user.logIn.login);
  //  show user
  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((userList) => {
        if (user.uid !== userList.key) {
          getDownloadURL(Ref(storage, userList.key))
            .then((URL) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                profile: URL,
              });
            })
            .catch((error) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                profile: null,
              });
            })
            .then(() => {
              setUsers([...users]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);
  // send request
  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendsReuquest")), {
      sendername: user.displayName,
      senderid: user.uid,
      recivername: data.username,
      reciverid: data.id,
      reciverProfile: data.profile ?? "./images/man.jpg",
      currentProfile: user.photoURL ?? "./images/man.jpg",
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
  }, [db]);

  useEffect(() => {
    const starCountRef = ref(db, "Friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        frndArr.push(item.val().reciverid + item.val().senderid);
      });
      setFrnd(frndArr);
    });
  }, [db]);

  // cancle request

  useEffect(() => {
    const starCountRef = ref(db, "friendsReuquest");
    onValue(starCountRef, (snapshot) => {
      let cancleArr = [];
      snapshot.forEach((item) => {
        cancleArr.push({ ...item.val(), id: item.key });
      });
      setCancle(cancleArr);
    });
  }, [db]);

  const handleRevome = (id) => {
    remove(ref(db, "friendsReuquest/" + id));
  };
  // block button show
  const [showBLock, setShowBlock] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let showBlockArr = [];
      snapshot.forEach((item) => {
        showBlockArr.push(item.val().blockedbyid + item.val().blockid);
      });
      setShowBlock(showBlockArr);
    });
  }, [db]);
  // handle search

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {<Search handleSearch={handleSearch} />}
      <div className="user-list">
        <div className="user-list-header">
          <h3>User List</h3>
        </div>
        <div className="user-list-container">
          {users
            .filter((item) => item.username.toLowerCase().includes(search))
            .map((item, i) => (
              <div key={i} className="user-list-wrapper">
                <div className="user-list-img">
                  <img
                    src={item.profile || "./images/man.jpg"}
                    onError={(e) => {
                      e.target.src = "./images/man.jpg";
                    }}
                    alt="man"
                  />
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
                    onClick={() =>
                      handleRevome(
                        cancle.find(
                          (req) =>
                            req.reciverid === item.id &&
                            req.senderid === user.uid
                        ).id
                      )
                    }
                    className="user-list-btn"
                  >
                    cancle
                  </Button>
                ) : showBLock.includes(item.id + user.uid) ||
                  showBLock.includes(user.uid + item.id) ? (
                  <Button
                    variant="outlined"
                    size="small"
                    disabled
                    className="user-list-btn"
                  >
                    Block
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
