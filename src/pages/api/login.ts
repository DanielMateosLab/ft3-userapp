import { users } from "@/server/data";
import { setAuthenticatedCookies } from "@/server/jwt";
import { BaseResponseData } from "@/types/response";
import { UserResponseSuccess, User } from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<UserResponseSuccess | BaseResponseData>,
) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = users.find((user: User) => user.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    setAuthenticatedCookies(res, user.id);

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({ user: userWithoutPassword });
  }
};

export default handler;
