import axiosClient from './api.service'

export const addOrderAPI = (addressID: number) => {
  const token = localStorage.getItem('token')
  const body = { addressID }
  return axiosClient
    .post('/api/order/add', body, {
      headers: { Authorization: token }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getDetailOrderAPI = (orderID: string) => {
  const token = localStorage.getItem('token')
  return axiosClient
    .get(`/api/order/${orderID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const addtransactionAPI = ({
  orderID,
  type,
  deposit
}: {
  orderID: string
  type: string
  deposit: number
}) => {
  const token = localStorage.getItem('token')
  const body = { orderID, type, deposit }
  return axiosClient
    .post('/api/order/transaction/add', body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}
