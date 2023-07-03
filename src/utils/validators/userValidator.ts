import { object, ref, string } from "yup";

export const signupUserSchema = object({
  name: string()
    .required("Name is required")
    .max(55, ({ max }) => `Name can't be longer than ${max} characters`),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .max(155, ({ max }) => `Password can't be longer than ${max} characters`)
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/^\S*$/, "Password must not contain any spaces"),
  passwordConfirmation: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const loginUserSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});
