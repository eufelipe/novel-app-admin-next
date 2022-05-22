import { fauna, q } from "@instances/fauna";
import { Novel } from "@models/novel";

type Response = {
  ref: {
    id: string;
  };
  data: Novel;
};
export const storePhotoNovelService = async (
  id: string,
  fileName: string
): Promise<boolean> => {
  try {
    const query = await fauna.query<Response>(
      q.Get(q.Match(q.Index("find_by_id"), q.Casefold(id)))
    );
    const novel = query?.data;
    const photos = novel?.photos ?? [];

    await fauna.query(
      q.Update(q.Ref(q.Collection("novels"), query.ref.id), {
        data: {
          photos: [...photos, fileName],
        },
      })
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
