import { fauna, q } from "@instances/fauna";
import { novelMapper } from "@mappers/novel-mapper";
import { Novel } from "@models/novel";
import { NovelResponse } from "@models/novels.response";

type Response = {
  data: NovelResponse[];
};
export const loadNovelTodayService = async (): Promise<Novel> => {
  const now = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(Date.now());

  console.log("now", now);

  const query = await fauna.query<Response>(
    q.Get(q.Match(q.Index("find_by_date"), now))
  );

  const novel = query?.data;

  return novelMapper(novel);
};
