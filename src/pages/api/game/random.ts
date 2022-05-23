import { methodNotAllowed, ok, badRequest } from "@helpers/http-helpers";
import { loadNovelsService } from "@services/load-novels.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    //TODO: refactor for search by photos on fauna db
    const results = await loadNovelsService();

    const random = results.filter((item) => item.photos?.length >= 5);
    const novel = random[Math.floor(Math.random() * random.length)];

    return ok(response, novel);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
