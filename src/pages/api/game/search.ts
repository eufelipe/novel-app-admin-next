import { methodNotAllowed, ok, badRequest } from "@helpers/http-helpers";
import { searchNovelsService } from "@services/search-novels.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const { term = "" } = request.query;
    const data = await searchNovelsService(String(term));

    return ok(response, data);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
