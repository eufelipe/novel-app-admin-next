import { Novel } from "./novel";

export type NovelResponse = {
  ref: {
    id: string;
  };
  data: Novel;
  after?: any;
  before?: any;
};
