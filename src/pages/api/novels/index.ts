import { methodNotAllowed, ok, badRequest } from "@helpers/http-helpers";
import { loadNovelsService } from "@services/load-novels.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const { after } = request.query;
    const results = await loadNovelsService(String(after));
    return ok(response, results);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
