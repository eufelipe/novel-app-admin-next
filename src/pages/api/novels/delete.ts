import {
  methodNotAllowed,
  ok,
  badRequest,
  unauthorized,
} from "@helpers/http-helpers";
import { deleteNovelService } from "@services/delete-novel.service";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "DELETE") {
    return methodNotAllowed(response);
  }

  const session = await getSession({ req: request });
  if (!session) {
    return unauthorized(response);
  }

  try {
    const { id } = request.query;

    console.log("id", id);

    if (!id) {
      return badRequest(response, { message: "no id" });
    }

    await deleteNovelService(String(id));
    return ok(response);
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
