import { users } from "@/server/data";
import { setJwt } from "@/server/jwt";
import { BaseResponseData } from "@/types/reponse";
import { UserResponseSuccess, UserWithPassword } from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<UserResponseSuccess | BaseResponseData>,
) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = users.find((user: UserWithPassword) => user.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    setJwt(res, user.id);

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({ user: userWithoutPassword });
  }
};

export default handler;
