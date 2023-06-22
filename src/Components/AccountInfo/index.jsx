import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { LoginUser } from "../../Feature/UserSlice/UserSlice";

const AccountInfo = () => {
  const auth = getAuth();
  const db = getDatabase();
  const user = useSelector((user) => user.logIn.login);
  const dispatch = useDispatch();
  const initialValues = {
    fullname: user.displayName,
    email: user.email,
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: () => {
      handleUpdateProfile();
    },
  });
  const handleUpdateProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: formik.values.fullname,
    }).then(async () => {
      await update(ref(db, "users/" + user.uid), {
        username: formik.values.fullname,
      });
      dispatch(LoginUser({ ...user, displayName: formik.values.fullname }));
      localStorage.setItem(
        "users",
        JSON.stringify({ ...user, displayName: formik.values.fullname })
      );
    });
  };

  return (
    <>
      <div className="account-page">
        <div className="account-container">
          <div className="account-profile">
            <picture>
              <img
                src={user.photoURL || "./images/man.jpg"}
                onError={(e) => {
                  e.target.src = "./images/man.jpg";
                }}
                alt="profile"
              />
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
