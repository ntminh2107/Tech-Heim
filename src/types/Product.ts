import { Comment } from "./Comment";

export type ProductCategory = {
  id: string;
  name: string;
  image: string;
  icon?: string;
  depth: number;
  subCategories: ProductCategory[];
};

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  discount?: boolean;
  percent?: number;
  favorite?: boolean;
  description?: string;
  color: string;
  rating: number;
  categoryId: string;
  brand: string;
  screenSize: number;
  processor: string;
  GPU: string;
  memory: number;
  bestSeller?: boolean;
  specifications: { key: string; value: string }[];
  imagePreview: ImagePreview[];
  comment?: Comment[];
  ratingFunction: { key: string; value: number }[];
};

export type ProductInCart = {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  color: string;
  quantity: number;
  salePrice?: number;
  productId: string;
};

export type Brand = {
  id: string;
  name: string;
  image: string;
};

export type ImagePreview = {
  img: string;
};

export type Colors = {
  color: string;
};

export type ShipCost = {
  label: string;
  time?: string;
  price: number;
};
