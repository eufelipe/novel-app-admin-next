import { methodNotAllowed, ok, badRequest } from "@helpers/http-helpers";
import { searchNovelsService } from "@services/search-novels.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const { term = "" } = request.query;
    //TODO: refactor for search by term on fauna db
    const data = await searchNovelsService();

    const items = data.filter((item) =>
      item.name.toLowerCase().includes(String(term).toLowerCase())
    );

    return ok(response, items);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
