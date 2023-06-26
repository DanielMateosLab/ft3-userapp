import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const setJwt = (res: NextApiResponse, id: number) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET || "secret");

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    }),
  );
};
