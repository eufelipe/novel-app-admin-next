import { NextApiRequest, NextApiResponse } from "next";

export const methodNotAllowed = (response: NextApiResponse) => {
  return response.status(405).json({ message: "Method not allowed" });
};

export const ok = (response: NextApiResponse, data: any) => {
  return response.status(200).json(data);
};
