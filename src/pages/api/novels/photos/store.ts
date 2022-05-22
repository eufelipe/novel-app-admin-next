import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed, ok, serverError } from "@helpers/http-helpers";

import { storePhotoNovelService } from "@services/store-photo-novel.service";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    return methodNotAllowed(response);
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
