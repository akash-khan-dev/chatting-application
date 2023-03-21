import React, { useEffect, useState } from "react";
import "./style.css";
import { AiOutlinePlus } from "react-icons/ai";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((user) => {
        users.push(user.val());
        setUsers(users);
      });
    });
  }, []);

  const currentUser = useSelector((user) => user.logIn.login.displayName);

  return (
    <>
      <div className="user-list">
        <div className="user-list-header">
          <h3>User List</h3>
        </div>
        <div className="user-list-container">
          {users.map(
            (item, i) =>
              currentUser !== item.username && (
                <div key={i} className="user-list-wrapper">
                  <div className="user-list-img">
                    <img src="./images/akash.jpg" alt="akash" />
                  </div>
                  <div className="user-list-name">
                    <h5>{item.username}</h5>
                  </div>
                  <div className="user-list-btn">
                    <AiOutlinePlus />
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
