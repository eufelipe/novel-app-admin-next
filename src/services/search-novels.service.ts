import { fauna, q } from "@instances/fauna";
import { novelMapper } from "@mappers/novel-mapper";
import { NovelResponse } from "@models/novels.response";

type Response = {
  data: NovelResponse[];
};

const FIND_ACCENTS = "á|ä|è|ë|î|ï|ò|ó|ö|ù|û|ñ|ç";
const REPLACE_ACCENTS = "a|a|e|e|i|i|o|o|o|u|u|n|c";

export const searchNovelsService = async (term?: string): Promise<any> => {
  const searchTerm = term
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  console.log("searchTerm", searchTerm);

  const query = await fauna.query<Response>(
    q.Map(
      q.Filter(
        q.Paginate(q.Match(q.Index("all_novels"))),
        q.Lambda(
          "novelRef",
          q.ContainsStr(
            q.LowerCase(
              q.ReplaceStrRegex(
                q.Select(["data", "name"], q.Get(q.Var("novelRef"))),
                FIND_ACCENTS,
                REPLACE_ACCENTS,
                false
              )
            ),
            searchTerm
          )
        )
      ),
      q.Lambda("novelRef", q.Get(q.Var("novelRef")))
    )
  );

  const results = query.data?.map((novelResponse) => {
    const novel = novelResponse.data;
    return novelMapper(novel);
  });

  return results;
};
