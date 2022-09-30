import { badRequest, methodNotAllowed, ok } from "@helpers/http-helpers";
import { loadNovelTodayService } from "@services/load-novels-today.service";
import { loadNovelsService } from "@services/load-novels.service";
import { NextApiRequest, NextApiResponse } from "next";

const ENABLE_RANDOM_IF_EMPTY_DATE =
  process.env.ENABLE_RANDOM_IF_EMPTY_DATE === "true" || false;

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return methodNotAllowed(response);
  }
  try {
    const todayNovel = await loadNovelTodayService();

    return ok(response, todayNovel);
  } catch (error) {
    if (ENABLE_RANDOM_IF_EMPTY_DATE) {
      const data = await loadNovelsService();
      const random = data.results.filter((item) => item.photos?.length >= 5);
      const novel = random[Math.floor(Math.random() * random.length)];

      if (novel) {
        return ok(response, novel);
      }
    }

    return badRequest(response, { message: "no results" });
  }
};
