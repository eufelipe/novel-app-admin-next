import { fauna, q } from "@instances/fauna";
import { NovelResponse } from "@models/novels.response";

type Response = {
  data: NovelResponse[];
};
export const loadNovelsService = async (): Promise<any> => {
  const query = await fauna.query<Response>(
    q.Map(q.Paginate(q.Match(q.Index("all_novels")), { size: 400 }), (ref) =>
      q.Get(ref)
    )
  );

  const results = query.data?.map((novelResponse) => {
    const novel = novelResponse.data;

    const date = novel?.date
      ? new Intl.DateTimeFormat("pt-BR", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date(novel?.date))
      : null;

    return { ...novel, date };
  });

  return results;
};
