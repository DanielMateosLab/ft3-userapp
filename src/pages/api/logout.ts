import { removeAuthenticatedCookies } from "@/server/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      removeAuthenticatedCookies(res);

      return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ error: `Method ${req.method} is not allowed.` });
  }
}
