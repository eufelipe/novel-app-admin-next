import { NextApiRequest, NextApiResponse } from "next";
import {
  methodNotAllowed,
  ok,
  serverError,
  unauthorized,
} from "@helpers/http-helpers";

import { storePhotoNovelService } from "@services/store-photo-novel.service";
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
    const { id, filename } = request.body;

    await storePhotoNovelService(id, filename);

    return ok(response);
  } catch (error) {
    console.log(error);
    return serverError(response);
  }
};
