import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed, ok, serverError } from "@helpers/http-helpers";
import { deletePhoto } from "@services/delete-photo.service";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "DELETE") {
    return methodNotAllowed(response);
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
