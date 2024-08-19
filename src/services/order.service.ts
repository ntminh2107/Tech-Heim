// src/services/order.service.ts
import axiosClient from "./api.service";
import { Notification, Order } from "../types/Order";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types/User";

export const getOrderAPI = () => {
  return axiosClient
    .get("order")
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const getDetailOrderAPI = (id: string) => {
  return axiosClient
    .get(`order/${id}`)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const addOrderAPI = (data: Order) => {
  const body = {
    id: uuidv4(),
    ...data,
  };
  return axiosClient
    .post("order", body)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const paidOrderAPI = ({
  id,
  currentOrder,
}: {
  id: string | number;
  currentOrder: Order;
}) => {
  return axiosClient
    .patch(`order/${id}`, currentOrder)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const getUserAPI = (id: string | number) => {
  return axiosClient
    .get(`users/${id}`)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const addBillToUserAPI = ({
  id,
  user,
}: {
  id: string | number;
  user: User;
}) => {
  return axiosClient
    .patch(`users/${id}`, user)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const addNotificationAPI = (data: Notification) => {
  return axiosClient
    .post(`notification`, data)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};

export const fetchNotificationAPI = (id: string) => {
  return axiosClient
    .get(`notification/${id}`)
    .then((res) => {
      const { data, status } = res;
      return { data, status };
    })
    .catch((err) => err);
};
