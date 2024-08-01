import { Payment } from "./Order";
import { ProductInCart } from "./Product";

export type User = {
  id: string | number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: number;
  password: string;
  paymentCard?: PaymentCard;
  bill?: Bill[];
};

export type CreditCard = {
  id: string;
  image: string;
  code: string;
  name: string;
  expires: string;
  selected: boolean;
};

export type PaymentCard = {
  idPayment: string;
  cardNumber: string;
  name: string;
  type: string;
  expired: string;
  cvv: string;
  selected?: boolean;
};

export type Bill = {
  id: string | number;
  fullname: string;
  street: string;
  city: string;
  region: string;
  postalcode: string;
  shippingMethod: string;
  shippingPrice: number;
  products: ProductInCart[];
  change?: number;
  grandTotal: number;
  sharedWith: Payment[];
};
