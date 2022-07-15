import { formatDate } from "@helpers/format-date";
import { Novel } from "@models/novel";

export const novelMapper = (novel: any): Novel => {
  const dateFormatted = novel?.date ? formatDate(novel?.date) : null;
  const photos = novel?.photos;
  const cover = novel?.photos?.[photos.length - 1];

  return { ...novel, cover, dateFormatted };
};
