import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  contactNumber: yup.string().required("Contact is required"),
  password: yup.string().min(6).max(32).required(),
  role: yup.string().required("Role is required"),
});
export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
