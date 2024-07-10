export type Comment = {
  id: string;
  user: string;
  userImage?: string;
  content: string;
  rating?: number;
  like?: number;
  unlike?: number;
  date: string;
};
