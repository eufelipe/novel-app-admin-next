import { fauna, q } from "@instances/fauna";
import { novelMapper } from "@mappers/novel-mapper";
import { NovelResponse } from "@models/novels.response";

type Response = {
  data: NovelResponse[];
};

const LIMIT_FOR_QUERY = 400;
const PATTERN_TO_REPLACE_A = "[àâªæáäãåā]";
const PATTERN_TO_REPLACE_E = "[èéêëē]";
const PATTERN_TO_REPLACE_I = "[ìíîï]";
const PATTERN_TO_REPLACE_O = "[ôœºööòóõøō]";
const PATTERN_TO_REPLACE_U = "[ùúûü]";
const PATTERN_TO_REPLACE_C = "[çćč]";

export const searchNovelsService = async (term?: string): Promise<any> => {
  const searchTerm = term
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Hadouken Ｏ( ｀_´)乂(｀_´ )Ｏ

  const replaceAccents = q.LowerCase(
    q.ReplaceStrRegex(
      q.ReplaceStrRegex(
        q.ReplaceStrRegex(
          q.ReplaceStrRegex(
            q.ReplaceStrRegex(
              q.ReplaceStrRegex(
                q.Select(["data", "name"], q.Get(q.Var("novelRef"))),
                PATTERN_TO_REPLACE_A,
                "a"
              ),
              PATTERN_TO_REPLACE_E,
              "e"
            ),
            PATTERN_TO_REPLACE_I,
            "i"
          ),
          PATTERN_TO_REPLACE_O,
          "o"
        ),
        PATTERN_TO_REPLACE_U,
        "u"
      ),
      PATTERN_TO_REPLACE_C,
      "c"
    )
  );

  const query = await fauna.query<Response>(
    q.Map(
      q.Filter(
        q.Paginate(q.Match(q.Index("all_novels")), { size: LIMIT_FOR_QUERY }),
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
