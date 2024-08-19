import { ProductInCart } from "./Product";

export type Order = {
  id?: string | number;
  userId: string | number;
  fullname: string;
  street: string;
  city: string;
  region: string;
  postalcode: string;
  shippingMethod: string;
  shippingPrice: number;
  Products: ProductInCart[];
  totalAmount: number;
  depositAmount: number;
  isPaid: boolean;
  sharedWith: string[];
  payments: Payment[];
};

export type Payment = {
  id: string;
  userId: string | number;
  fullname: string;
  amountPaid: number;
  paidTime: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  userIDs: { id: string | number }[];
};
