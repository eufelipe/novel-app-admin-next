import { methodNotAllowed, created, badRequest } from "@helpers/http-helpers";
import { storeNovelService } from "@services/store-novel.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    return methodNotAllowed(response);
  }
  try {
    const { date, id } = request.body;
    await storeNovelService(id, date);
    return created(response);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
