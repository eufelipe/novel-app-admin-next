import { methodNotAllowed, ok } from "@helpers/http-helpers";
import { loadNovelsService } from "@services/load-novels.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const results = await loadNovelsService();
    return ok(response, results);
  } catch (error) {
    console.log(error);
    return ok(response, { message: "no results" });
  }
};
