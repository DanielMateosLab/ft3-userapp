import { LogData } from "@/types/logData";
import { BaseResponseData } from "@/types/response";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponseData>,
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const log: LogData = req.body;

  // Here we just console.log the error, but in a production app we would have a logging service
  console.log(log);

  res.status(200).json({ message: "Received" });
}
