export const novelMapper = (novel: any) => {
  const date = novel?.date
    ? new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(novel?.date))
    : null;

  return { ...novel, date };
};
