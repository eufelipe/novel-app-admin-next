import { fauna, q } from "@instances/fauna";
import { novelMapper } from "@mappers/novel-mapper";
import { Novel } from "@models/novel";
import { NovelResponse } from "@models/novels.response";

type Query = {
  data: NovelResponse[];
  after?: any;
};

const RESULTS_PER_PAGE = 50;

export type NovelQueryResponse = {
  results: Novel[];
  after?: any;
};

export const loadNovelsService = async (
  after?: string,
  perPage = RESULTS_PER_PAGE
): Promise<NovelQueryResponse> => {
  const paginate =
    Number(after) > 1 ? { after: [q.Ref(q.Collection("novels"), after)] } : {};

  const query = await fauna.query<Query>(
    q.Map(
      q.Paginate(q.Match(q.Index("all_novels"), []), {
        size: perPage,
        ...paginate,
      }),
      (ref) => q.Get(ref)
    )
  );

  const nextPage = query.after.length > 0 ? query.after[0].id : undefined;

  const results = query.data?.map((novelResponse) => {
    const novel = novelResponse.data;
    return novelMapper(novel);
  });

  return { results, after: nextPage };
};
