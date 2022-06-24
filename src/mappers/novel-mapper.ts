import { formatDate } from "@helpers/format-date";
import { Novel } from "@models/novel";

export const novelMapper = (novel: any): Novel => {
  const dateFormatted = novel?.date ? formatDate(novel?.date) : null;

  return { ...novel, dateFormatted };
};
