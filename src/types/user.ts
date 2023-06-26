export interface UserWithPassword {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserResponseSuccess {
  user: Omit<UserWithPassword, "password">;
}
