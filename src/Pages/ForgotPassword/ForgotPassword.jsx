import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import "./ForgotPassword.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import BeatLoader from "react-spinners/BeatLoader";
import { Reset } from "../../validation/validation";
import { ToastContainer, toast } from "react-toastify";

export const ForgotPassword = () => {
  const [loding, setLoding] = useState(false);
  const auth = getAuth();
  const handleResetPass = () => {
    setLoding(true);
    sendPasswordResetEmail(auth, formik.values.email)
      .then(() => {
        toast.success("Please check your email", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });

        setLoding(false);
      })
      .catch((error) => {
        toast.success("Email not valide", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setLoding(false);
      });
  };
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Reset,
    onSubmit: () => {
      handleResetPass();
    },
  });
  return (
    <>
      <ToastContainer />
      <div className="forgot-body">
        <div className="forgot-box">
          <p>Reset Your Password</p>
          <div className="forgot-forms">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                onChange={formik.handleChange}
                type="email"
                className="reset-inputs"
                id="outlined-basic"
                label="Your Email"
                variant="outlined"
                name="email"
                value={formik.values.email}
              />
              <div className="forgot-errors">
                {formik.errors.email && formik.touched.email ? (
                  <h3>{formik.errors.email}</h3>
                ) : null}
              </div>
              {loding ? (
                <Button
                  disabled
                  onClick={handleResetPass}
                  type="submit"
                  className="reset-button"
                  variant="contained"
                >
                  <BeatLoader />
                </Button>
              ) : (
                <Button
                  onClick={handleResetPass}
                  type="submit"
                  className="reset-button"
                  variant="contained"
                >
                  Reset Password
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
