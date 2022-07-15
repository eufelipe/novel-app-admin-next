import { badRequest, methodNotAllowed, ok } from "@helpers/http-helpers";
import { reportsService } from "@services/reports.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const results = await reportsService();
    return ok(response, results);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
