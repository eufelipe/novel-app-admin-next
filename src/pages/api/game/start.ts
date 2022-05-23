import { methodNotAllowed, ok, badRequest } from "@helpers/http-helpers";
import { loadNovelTodayService } from "@services/load-novels-today.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const novel = await loadNovelTodayService();
    return ok(response, novel);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
