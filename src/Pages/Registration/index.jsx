import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BeatLoader from "react-spinners/BeatLoader";
import TextField from "@mui/material/TextField";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";
import { useFormik } from "formik";
import { singup } from "../../validation/validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

export const Registration = () => {
  const [shopass, setShowpass] = useState("password");
  const [loding, setLoding] = useState(false);
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const handleShow = () => {
    if (shopass === "password") {
      setShowpass("text");
    } else {
      setShowpass("password");
    }
  };

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: singup,
    onSubmit: () => {
      setLoding(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          updateProfile(auth.currentUser, {
            displayName: formik.values.fullname,
          }).then(() => {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                set(ref(db, "users/" + user.uid), {
                  username: user.displayName,
                  email: user.email,
                });
              })
              .then(() => {
                toast.success("Registration done! Please check your email", {
                  position: "bottom-center",
                  autoClose: 1500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                });
                formik.resetForm();
                setLoding(false);
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              });
          });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            toast.success("Email Alraedy in used", {
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
        <Grid className="box" container spacing={5}>
          <Grid item xs={6}>
            <div className="forms">
              <div className="reg-head">
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
              </div>
              <div className="inputs-form">
                <form className="regi-forms" onSubmit={formik.handleSubmit}>
                  <TextField
                    onChange={formik.handleChange}
                    type="text"
                    className="inputs-design"
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    name="fullname"
                    value={formik.values.fullname}
                  />
                  {formik.errors.fullname ? (
                    <p className="errors">{formik.errors.fullname}</p>
                  ) : null}
                  <TextField
                    onChange={formik.handleChange}
                    type="email"
                    className="inputs-design"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="errors">{formik.errors.email}</p>
                  ) : null}
                  <div className="password">
                    <TextField
                      onChange={formik.handleChange}
                      type={shopass}
                      className="inputs-design"
                      id="outlined-basic"
                      label="password"
                      variant="outlined"
                      name="password"
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <p className="errors">{formik.errors.password}</p>
                    ) : null}
                    <div className="eyes" onClick={handleShow}>
                      {shopass === "password" ? (
                        <AiFillEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>
                  <TextField
                    onChange={formik.handleChange}
                    type="password"
                    className="inputs-design"
                    id="outlined-basic"
                    label="Confirm password"
                    variant="outlined"
                    name="confirmpassword"
                    value={formik.values.confirmpassword}
                  />
                  {formik.errors.confirmpassword &&
                  formik.touched.confirmpassword ? (
                    <p className="errors">{formik.errors.confirmpassword}</p>
                  ) : null}
                  {loding ? (
                    <Button
                      disabled
                      type="submit"
                      className="button"
                      variant="contained"
                    >
                      <BeatLoader />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="button"
                      variant="contained"
                    >
                      sing up
                    </Button>
                  )}

                  <div className="links">
                    <p>
                      Already have an account ?
                      <span>
                        <Link to="/login">Sign In</Link>
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="singup-img">
              <picture>
                <img src="./images/sign up.png" alt="signup" />
              </picture>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
