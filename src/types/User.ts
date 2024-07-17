export type User = {
  id: string | number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: number;
  password: string;
};

export type CreditCard = {
  id: string;
  image: string;
  code: string;
  name: string;
  expires: string;
  selected: boolean;
};
