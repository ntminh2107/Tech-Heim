import { Comment } from "./Comment";

export type Blog = {
  id: string;
  title: string;
  author: string;
  readTime: string;
  tags: [];
  releaseDate: string;
  content: string;
  image: string;
  comment?: Comment[];
};

export type VideoBlog = {
  id: string;
  title: string;
  url: string;
  image: string;
};
