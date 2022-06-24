import {
  methodNotAllowed,
  created,
  badRequest,
  unauthorized,
} from "@helpers/http-helpers";
import { storeNovelService } from "@services/store-novel.service";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    return methodNotAllowed(response);
  }

  const session = await getSession({ req: request });
  if (!session) {
    return unauthorized(response);
  }

  try {
    const { id, name, date, author, year } = request.body;
    await storeNovelService({ id, name, date, author, year });
    return created(response);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
