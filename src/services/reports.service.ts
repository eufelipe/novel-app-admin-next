import { fauna, q } from "@instances/fauna";
import { novelMapper } from "@mappers/novel-mapper";
import { Novel } from "@models/novel";
import { NovelResponse } from "@models/novels.response";

type Query = {
  data: NovelResponse[];
  after?: any;
};

export type ReportsResponse = {
  today: Novel;
  latest: Novel[];
  next: Novel[];
};

export const reportsService = async (): Promise<ReportsResponse> => {
  const query = await fauna.query<Query>(
    q.Map(
      q.Paginate(q.Match(q.Index("all_novels"), []), { size: 600 }),
      (ref) => q.Get(ref)
    )
  );
  const locale = "fr-CA";
  const formatDateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const dateCalculated = 24 * 60 * 60 * 1000;

  const lastDates = new Array(7)
    .fill(0)
    .map((_, i) =>
      new Intl.DateTimeFormat(locale, formatDateOptions).format(
        Date.now() - i * dateCalculated
      )
    );

  const nextDates = new Array(7)
    .fill(0)
    .map((_, i) =>
      new Intl.DateTimeFormat(locale, formatDateOptions).format(
        Date.now() + i * dateCalculated
      )
    );

  const now = new Intl.DateTimeFormat(locale, formatDateOptions).format(
    Date.now()
  );

  const results = query.data?.map((novelResponse) => {
    const novel = novelResponse.data;
    return novelMapper(novel);
  });

  const todayNovel = results?.find((novel) => novel.date === now);

  const latestNovels = results
    ?.filter((novel) => lastDates.includes(novel.date) && novel.date !== now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const nextNovels = results
    ?.filter((novel) => nextDates.includes(novel.date) && novel.date !== now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { today: todayNovel, latest: latestNovels, next: nextNovels };
};
