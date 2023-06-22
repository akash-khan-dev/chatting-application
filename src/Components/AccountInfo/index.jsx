import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

const AccountInfo = () => {
  const user = useSelector((user) => user.logIn.login);

  return (
    <>
      <div className="account-page">
        <div className="account-container">
          <div className="account-profile">
            <picture>
              <img src={user.photoURL} alt="profile" />
            </picture>
          </div>
          <div className="account-info">
            <form action="">
              <TextField
                type="text"
                fullWidth
                className="account-input"
                margin="normal"
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                name="fullname"
              />
              <TextField
                type="text"
                fullWidth
                className="account-input"
                margin="normal"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="fullname"
              />
              <TextField
                type="text"
                fullWidth
                className="account-input"
                margin="normal"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="fullname"
              />
              <Button type="submit" className="account-btn" variant="contained">
                update account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
