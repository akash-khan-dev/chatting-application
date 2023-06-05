import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { ActiveSingle } from "../../Feature/UserSlice/ActiveSingleSlice";

const MessageGroups = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const [massegeGroup, setMassegeGroup] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "groupmember");
    onValue(starCountRef, (snapshot) => {
      let massegeGroupArr = [];
      snapshot.forEach((item) => {
        massegeGroupArr.push({ ...item.val(), id: item.key });
      });
      setMassegeGroup(massegeGroupArr);
    });
  }, [db]);
  // for send redux
  const handleGroupMessage = (item) => {
    dispatch(
      ActiveSingle({
        status: "group",
        name: item.groupname,
        id: item.id,
        adminid: item.adminid,
      })
    );
  };
  return (
    <>
      <div className="massage-group-list">
        <div className="message-group-header">
          <h3>Message Groups</h3>
        </div>
        <div className="message-group-item-container">
          {massegeGroup.map((item, i) => (
            <div
              key={i}
              className="message-group-item-wrapper"
              onClick={() => handleGroupMessage(item)}
            >
              <div className="massege-group-item-img">
                <picture>
                  <img src=" ./images/akash.jpg" alt="man" />
                </picture>
              </div>
              <div className="massege-group-item-name">
                <h5>{item.groupname}</h5>
                <p>admin:{item.adminname}</p>
              </div>
              <div className="massege-group-item-button">
                <Button variant="contained">Massege</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MessageGroups;
