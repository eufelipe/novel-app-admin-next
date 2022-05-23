import { methodNotAllowed, ok, badRequest } from "@helpers/http-helpers";
import { findNovelService } from "@services/find-novel.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    return methodNotAllowed(response);
  }

  try {
    const { answerId, photoId } = request.body;
    const novel = await findNovelService(String(answerId));
    const isPhotoFromNovel = novel.photos.includes(photoId);

    if (isPhotoFromNovel) {
      const output = {
        success: isPhotoFromNovel,
        novel,
      };
      return ok(response, output);
    }

    return badRequest(response, { message: "no results" });
  } catch (error) {
    console.log(error);
    return badRequest(response, { message: "no results" });
  }
};
