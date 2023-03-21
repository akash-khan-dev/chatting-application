import React, { useState } from "react";
import "./Login.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import { login } from "../../validation/validation";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../Feature/UserSlice/UserSlice";

export const Login = () => {
  const auth = getAuth();
  const [showPass, setShowPass] = useState("password");
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPass = () => {
    if (showPass === "password") {
      setShowPass("text");
    } else {
      setShowPass("password");
    }
  };
  const Googleprovider = new GoogleAuthProvider();
  const Facebookprovider = new FacebookAuthProvider();
  // google authentication
  const handleGoogleAuth = () => {
    signInWithPopup(auth, Googleprovider).then(({ user }) => {
      dispatch(LoginUser(user));
      localStorage.setItem("users", JSON.stringify(user));
    });
  };
  // facebook authentication
  const handleFacebookAuth = () => {
    signInWithPopup(auth, Facebookprovider).then(({ user }) => {
      dispatch(LoginUser(user));
      localStorage.setItem("users", JSON.stringify(user));
    });
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: login,
    onSubmit: () => {
      setLoding(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          if (auth.currentUser.emailVerified === true) {
            dispatch(LoginUser(user));
            localStorage.setItem("users", JSON.stringify(user));
            setLoding(false);
            navigate("/");
          } else {
            toast.success("Email Not Verified", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            });
            setLoding(false);
          }
        })
        .catch((error) => {
          if (error.code.includes("auth/user-not-found")) {
            toast.success("auth/user-not-found", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            });
          } else {
            toast.success("password not currect", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            });
          }
          setLoding(false);
        });
    },
  });
  return (
    <div>
      <Container fixed>
        <ToastContainer />
        <div className="inputs-form">
          <Grid className="box" container spacing={10}>
            <Grid item xs={5}>
              <div className="singup-img">
                <picture>
                  <img src="./images/login.png" alt=" login" />
                </picture>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="avatar">
                <picture>
                  <img src="./images/avatar.png" alt="" />
                </picture>
              </div>
              <div className="log-head">
                <h2>Login to your account!</h2>
              </div>
              <div className="total_auth">
                <div onClick={handleGoogleAuth} className="authentication">
                  <div className="google">
                    <picture>
                      <img src="./images/google.png" alt="" />
                    </picture>
                  </div>
                  <div className="auth-text">
                    <p>Login with Google</p>
                  </div>
                </div>
                <div onClick={handleFacebookAuth} className="authentication">
                  <div className="google">
                    <BsFacebook />
                  </div>
                  <div className="auth-text">
                    <p>Login with Facebook</p>
                  </div>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit} className="forms">
                <TextField
                  onChange={formik.handleChange}
                  className="inputs-design"
                  type="email"
                  id="outlined-basic"
                  label="Email Address"
                  variant="filled"
                  value={formik.values.email}
                  name="email"
                />

                {formik.errors.email && formik.touched.email ? (
                  <p className="log-errors">{formik.errors.email}</p>
                ) : null}
                <div className="log-password">
                  <TextField
                    onChange={formik.handleChange}
                    type={showPass}
                    className="inputs-design"
                    id="standard-basic"
                    label="Password"
                    variant="filled"
                    name="password"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className="log-errors">{formik.errors.password}</p>
                  ) : null}
                  <div className="log-eyes" onClick={handleShowPass}>
                    {showPass === "password" ? (
                      <AiFillEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </div>
                </div>
                {loding ? (
                  <Button
                    disabled
                    type="submit"
                    className="buttons"
                    variant="contained"
                  >
                    <BeatLoader />
                  </Button>
                ) : (
                  <Button type="submit" className="buttons" variant="contained">
                    Login to Continue
                  </Button>
                )}

                <div className="links-sign">
                  <div className="forgot-password">
                    <Link to="/forgotpass">Forgot Password</Link>
                  </div>
                  <p>
                    Don’t have an account ?
                    <Link to="/registration">Sign up</Link>
                  </p>
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};
