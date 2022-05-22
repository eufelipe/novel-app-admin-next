import { fauna, q } from "@instances/fauna";
import s3 from "@instances/s3";
import { Novel } from "@models/novel";

type Response = {
  ref: {
    id: string;
  };
  data: Novel;
};
export const deletePhoto = async (
  id: string,
  photo: string
): Promise<boolean> => {
  try {
    const query = await fauna.query<Response>(
      q.Get(q.Match(q.Index("find_by_id"), q.Casefold(id)))
    );

    const novel = query?.data;
    const photos = (novel?.photos ?? []).filter((item) => item !== photo);

    await fauna.query(
      q.Update(q.Ref(q.Collection("novels"), query.ref.id), {
        data: {
          photos,
        },
      })
    );

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${photo}`,
    };

    await s3.deleteObject(params).promise();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
