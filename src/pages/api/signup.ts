import { users } from "@/server/data";
import { setJwt } from "@/server/jwt";
import { BaseResponseData } from "@/types/response";
import { UserResponseSuccess, User } from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<UserResponseSuccess | BaseResponseData>,
) => {
  if (req.method === "POST") {
    const { username, password, email } = req.body;

    const userExists = users.find(
      (u) => u.email === email || u.username === username,
    );

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser: User = {
      id: Date.now(),
      email,
      username,
      password,
    };

    users.push(newUser);

    setJwt(res, newUser.id);

    return res.status(201).json({ user: { id: newUser.id, username, email } });
  }
};

export default handler;
