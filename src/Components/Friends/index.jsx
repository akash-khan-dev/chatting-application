import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Alert from "@mui/material/Alert";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Search } from "../Search";
import { ActiveSingle } from "../../Feature/UserSlice/ActiveSingleSlice";

export const Friends = () => {
  const dispath = useDispatch();
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
          user.uid === friens.val().senderid ||
          user.uid === friens.val().reciverid
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

  const [search, setSearch] = useState("");
  const freandSearchQueryRef = useRef(search);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    freandSearchQueryRef.current = e.target.value;
  };
  // handleSingleChat
  const handleSingleChat = (data) => {
    if (user.uid === data.reciverid) {
      dispath(
        ActiveSingle({
          status: "single",
          id: data.senderid,
          name: data.sendername,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.senderid,
          name: data.sendername,
        })
      );
    } else {
      dispath(
        ActiveSingle({
          status: "single",
          id: data.reciverid,
          name: data.recivername,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.reciverid,
          name: data.recivername,
        })
      );
    }
  };
  return (
    <>
      <Search handleSearch={handleSearch} />
      <div className="friends">
        <div className="friends-header">
          <h3>Friends</h3>
        </div>
        <div className="friends-container">
          {allFriends.length === 0 ? (
            <Alert severity="error">no request yet!</Alert>
          ) : (
            allFriends
              .filter(
                (item) =>
                  item.recivername &&
                  item.sendername
                    .toLowerCase()
                    .includes(freandSearchQueryRef.current)
              )
              .map((item, i) => (
                <div
                  key={i}
                  className="friends-wrapper"
                  onClick={() => handleSingleChat(item)}
                >
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
              ))
          )}
        </div>
      </div>
    </>
  );
};
