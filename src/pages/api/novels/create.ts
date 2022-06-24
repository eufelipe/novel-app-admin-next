import {
  methodNotAllowed,
  ok,
  badRequest,
  unauthorized,
} from "@helpers/http-helpers";
import { createNovelService } from "@services/create-novel.service";
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
    const { name, date, author, year } = request.body;
    const id = await createNovelService({ name, date, author, year });
    return ok(response, { id });
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
