import { fauna, q } from "@instances/fauna";
import { v4 as uuidV4 } from "uuid";

interface CreateNovelProps {
  name: string;
  author?: string;
  year?: string;
  date?: string;
}

export const createNovelService = async ({
  name,
  author,
  year,
  date,
}: CreateNovelProps): Promise<string> => {
  const id = uuidV4();

  await fauna.query(
    q.Create(q.Collection("novels"), {
      data: {
        id,
        name,
        author,
        year,
        date,
        photos: [],
      },
    })
  );

  return id;
};
