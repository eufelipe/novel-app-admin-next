import { NextApiResponse } from "next";

export const methodNotAllowed = (response: NextApiResponse) => {
  return response.status(405).json({ message: "Method not allowed" });
};

export const ok = (response: NextApiResponse, data?: any) => {
  return response.status(200).json(data);
};

export const created = (response: NextApiResponse) => {
  return response.status(201).json({ message: "Created" });
};

export const badRequest = (response: NextApiResponse, data: any) => {
  return response.status(400).json(data);
};

export const unauthorized = (response: NextApiResponse) => {
  return response.status(401).send("Not authorized");
};

export const serverError = (response: NextApiResponse) => {
  return response.status(500).send("Internal server error");
};
