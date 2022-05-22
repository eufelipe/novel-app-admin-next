import { fauna, q } from "@instances/fauna";
import { novelMapper } from "@mappers/novel-mapper";
import { Novel } from "@models/novel";

type Response = {
  data: Novel;
};
export const findNovelService = async (id: string): Promise<any> => {
  const query = await fauna.query<Response>(
    q.Get(q.Match(q.Index("find_by_id"), q.Casefold(id)))
  );
  return novelMapper(query.data);
};
