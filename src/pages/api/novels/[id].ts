import { methodNotAllowed, ok } from "@helpers/http-helpers";
import { findNovelService } from "@services/find-novel.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const { id } = request.query;
    const results = await findNovelService(String(id));
    return ok(response, results);
  } catch (error) {
    console.log(error);
    return ok(response, { message: "no results" });
  }
};
