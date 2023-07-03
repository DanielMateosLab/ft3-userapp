import {
  loginUserSchema,
  signupUserSchema,
} from "@/utils/validators/userValidator";
import { InferType } from "yup";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export type UserWithoutPassword = Omit<User, "password">;

export interface UserResponseSuccess {
  user: UserWithoutPassword;
}

export type SignupUser = InferType<typeof signupUserSchema>;

export type LoginUser = InferType<typeof loginUserSchema>;
