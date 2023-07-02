import { object, ref, string } from "yup";

export const signupUserSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
  passwordConfirmation: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
