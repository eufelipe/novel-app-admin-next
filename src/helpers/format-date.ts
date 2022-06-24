export const formatDate = (date: string): string => {
  const dateFormatted = date
    ? new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(date))
    : null;

  return dateFormatted;
};
