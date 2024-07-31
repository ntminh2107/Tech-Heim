import { ProductInCart } from "./Product";

export type Order = {
  id?: string;
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
  paymentTransaction?: string;
  payments: Payment[];
};

export type Payment = {
  id: string;
  userId: string | number;
  fullname: string;
  amountPaid: number;
  paidTime: string;
};
