import { AxiosResponse } from "axios";
import { SignUpBody } from "../types/RequestBody";
import axiosClient from "./api.service";
import { v4 as uuidv4 } from "uuid";
import { CreditCard, User } from "../types/User";

export const signUp = (data: SignUpBody) => {
  const body = {
    id: uuidv4(),
    ...data,
  };

  return axiosClient
    .post("users", body)
    .then((res: AxiosResponse<SignUpBody, number>) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const getCurrentUserAPI = (id: string) => {
  return axiosClient
    .get(`users/${id}`)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const getCreditCardAPI = () => {
  return axiosClient
    .get(`credit-card`)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const addCreditCardAPI = (
  data: Omit<CreditCard, "id" | "image" | "selected">
) => {
  const body = {
    id: uuidv4(),
    image: "/assets/icons/delivery/visa.svg",
    selected: false,
    ...data,
  };
  return axiosClient
    .post(`credit-card`, body)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const editUserAPI = (user: User) => {
  return axiosClient
    .put(`users/${user.id}`)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const editFullnameUserAPI = ({
  id,
  fullName,
}: {
  id: string | number;
  fullName: string;
}) => {
  const body = { fullName };
  return axiosClient
    .patch(`users/${id}`, body)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const editPhoneUserAPI = ({
  id,
  phoneNumber,
}: {
  id: string | number;
  phoneNumber: string;
}) => {
  const body = { phoneNumber };
  return axiosClient
    .put(`users/${id}`, body)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const editAddressUserAPI = ({
  id,
  address,
}: {
  id: string | number;
  address: string;
}) => {
  const body = { address };
  return axiosClient
    .put(`users/${id}`, body)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const editPasswordUserAPI = ({
  id,
  password,
}: {
  id: string | number;
  password: string;
}) => {
  const body = { password };
  return axiosClient
    .patch(`users/${id}`, body)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const addPaymentCardAPI = ({
  id,
  currentUser,
}: {
  id: string | number;
  currentUser: User;
}) => {
  return axiosClient
    .patch(`users/${id}`, currentUser)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const editPaymentCardAPI = ({
  id,
  users,
}: {
  id: string | number;
  users: User;
}) => {
  const body = { users };
  return axiosClient
    .post(`users/${id}`, body)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};
