import { fauna, q } from "@instances/fauna";
import { Novel } from "@models/novel";

type Response = {
  ref: {
    id: string;
  };
  data: Novel;
};

interface StoreNovelProps {
  date: string;
}

export const findNovelByDateService = async ({
  date,
}: StoreNovelProps): Promise<Response> => {
  try {
    return await fauna.query<Response>(
      q.Get(q.Match(q.Index("find_by_date"), date))
    );
  } catch (error) {
    return null;
  }
};
