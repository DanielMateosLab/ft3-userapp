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
