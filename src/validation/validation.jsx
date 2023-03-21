import * as Yup from "yup";

export const singup = Yup.object({
  fullname: Yup.string().min(3).max(15).required("Please inter your fullname"),
  email: Yup.string().email().required("Please inter your valid email"),
  password: Yup.string().min(8).required("Please inter your password"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must be match!")
    .required("Please confirm your password"),
});

export const login = Yup.object({
  email: Yup.string().email().required("Please inter your valid email"),
  password: Yup.string().min(8).required("Please inter your password"),
});

export const Reset = Yup.object({
  email: Yup.string().email().required("Please inter your email"),
});
