import { users } from "@/server/data";
import { removeAuthenticatedCookies } from "@/server/jwt";
import { BaseResponseData } from "@/types/response";
import { UserResponseSuccess } from "@/types/user";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<UserResponseSuccess | BaseResponseData>,
) => {
  if (req.method === "GET") {
    try {
      const token = req.cookies.auth;

      if (!token) return resolveUnauthenticated(res);

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
        id: number;
      };

      const user = users.find((u) => u.id === decoded.id);

      if (!user) return resolveUnauthenticated(res);

      const { password, ...userWithoutPassword } = user;

      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      return resolveUnauthenticated(res);
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

const resolveUnauthenticated = (res: NextApiResponse) => {
  removeAuthenticatedCookies(res);
  return res.status(401).json({ message: "Not authenticated" });
};

export default handler;
