// src/services/order.service.ts
import axiosClient from "./api.service";
import { Order } from "../types/Order";
import { v4 as uuidv4 } from "uuid";

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
