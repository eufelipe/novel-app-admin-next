import {
  badRequest,
  created,
  methodNotAllowed,
  unauthorized,
} from "@helpers/http-helpers";
import { findNovelByDateService } from "@services/find-novel-by-date.service";
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

    const alreadyExistsDate = await findNovelByDateService({ date });

    if (alreadyExistsDate && alreadyExistsDate?.data.id !== id) {
      return badRequest(response, { message: "date already exist" });
    }

    await storeNovelService({ id, name, date, author, year });

    return created(response);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
