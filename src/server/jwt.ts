import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const setAuthenticatedCookies = (res: NextApiResponse, id: number) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET || "secret");

  res.setHeader("Set-Cookie", [
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    }),
    cookie.serialize("loggedIn", "true", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    }),
  ]);
};

export const removeAuthenticatedCookies = (res: NextApiResponse) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("auth", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    }),
    cookie.serialize("loggedIn", "false", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    }),
  ]);
};
