export type User = {
  id: string | number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: number;
  password: string;
  paymentCard?: PaymentCard;
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
