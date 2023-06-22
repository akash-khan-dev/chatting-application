import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

const AccountInfo = () => {
  const user = useSelector((user) => user.logIn.login);
  const initialValues = {
    fullname: user.displayName,
    email: user.email,
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,

    onsubmit: () => {
      console.log("hello");
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="text"
                onChange={formik.handleChange}
                fullWidth
                className="account-input"
                margin="normal"
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                name="fullname"
                value={formik.values.fullname}
              />
              <TextField
                type="text"
                fullWidth
                className="account-input"
                margin="normal"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                value={formik.values.email}
                disabled
              />
              <TextField
                type="text"
                onChange={formik.handleChange}
                fullWidth
                className="account-input"
                margin="normal"
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                name="password"
                value={formik.values.password}
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
