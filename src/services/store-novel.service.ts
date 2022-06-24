import { fauna, q } from "@instances/fauna";
import { Novel } from "@models/novel";

type Response = {
  ref: {
    id: string;
  };
  data: Novel;
};

interface StoreNovelProps {
  id: string;
  name: string;
  date: string;
  author?: string;
  year?: string;
}

export const storeNovelService = async ({
  id,
  name,
  author,
  year,
  date,
}: StoreNovelProps): Promise<void> => {
  const novel = await fauna.query<Response>(
    q.Get(q.Match(q.Index("find_by_id"), q.Casefold(id)))
  );

  await fauna.query(
    q.Update(q.Ref(q.Collection("novels"), novel.ref.id), {
      data: {
        name,
        author,
        year,
        date,
      },
    })
  );
};
