import { fauna, q } from "@instances/fauna";
import { novelMapper } from "@mappers/novel-mapper";
import { NovelResponse } from "@models/novels.response";

type Response = {
  data: NovelResponse[];
};

export const searchNovelsService = async (term?: string): Promise<any> => {
  const searchTerm = term
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const PATTERN_A = "[àâªæáäãåā]";
  const PATTERN_E = "[èéêëē]";
  const PATTERN_I = "[ìíîï]";
  const PATTERN_O = "[ôœºööòóõøō]";
  const PATTERN_U = "[ùúûü]";
  const PATTERN_C = "[çćč]";

  const replaceAccents = q.LowerCase(
    q.ReplaceStrRegex(
      q.ReplaceStrRegex(
        q.ReplaceStrRegex(
          q.ReplaceStrRegex(
            q.ReplaceStrRegex(
              q.ReplaceStrRegex(
                q.Select(["data", "name"], q.Get(q.Var("novelRef"))),
                PATTERN_A,
                "a"
              ),
              PATTERN_E,
              "e"
            ),
            PATTERN_I,
            "i"
          ),
          PATTERN_O,
          "o"
        ),
        PATTERN_U,
        "u"
      ),
      PATTERN_C,
      "c"
    )
  );

  const query = await fauna.query<Response>(
    q.Map(
      q.Filter(
        q.Paginate(q.Match(q.Index("all_novels")), { size: 400 }),
        q.Lambda("novelRef", q.ContainsStr(replaceAccents, searchTerm))
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
