import { fauna, q } from "@instances/fauna";

export const deleteNovelService = async (id: string): Promise<any> => {
  await fauna.query(
    q.Map(
      q.Paginate(q.Match(q.Index("find_by_id"), q.Casefold(id))),
      q.Lambda("X", q.Delete(q.Var("X")))
    )
  );
  return true;
};
