import { fauna, q } from "@instances/fauna";
import { Novel } from "@models/novel";

type Response = {
  ref: {
    id: string;
  };
  data: Novel;
};
export const storeNovelService = async (
  id: string,
  date: string
): Promise<void> => {
  const novel = await fauna.query<Response>(
    q.Get(q.Match(q.Index("find_by_id"), q.Casefold(id)))
  );

  await fauna.query(
    q.Update(q.Ref(q.Collection("novels"), novel.ref.id), {
      data: {
        date,
      },
    })
  );
};
