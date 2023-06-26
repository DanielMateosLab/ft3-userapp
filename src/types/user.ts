import { BaseResponseData } from "./reponse";

export interface UserWithPassword {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserPostSuccess extends BaseResponseData {
  user: Omit<UserWithPassword, "password">;
}
