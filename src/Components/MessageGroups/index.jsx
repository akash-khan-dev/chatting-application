import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { getDatabase, ref, onValue } from "firebase/database";

const MessageGroups = () => {
  const db = getDatabase();
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
  console.log(massegeGroup);
  return (
    <>
      <div className="massage-group-list">
        <div className="message-group-header">
          <h3>Message Groups</h3>
        </div>
        <div className="message-group-item-container">
          {massegeGroup.map((item, i) => (
            <div key={i} className="message-group-item-wrapper">
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
