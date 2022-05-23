import { NextApiRequest, NextApiResponse } from "next";
import {
  methodNotAllowed,
  ok,
  serverError,
  unauthorized,
} from "@helpers/http-helpers";
import { deletePhoto } from "@services/delete-photo.service";
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
    const { id, photo } = request.query;
    const res = await deletePhoto(String(id), String(photo));

    return ok(response, res);
  } catch (error) {
    console.log(error);
    return serverError(response);
  }
};
