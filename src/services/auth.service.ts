import axiosClient from './api.service'

export const registerAPI = ({
  fullName,
  email,
  password,
  phoneNumber
}: {
  fullName: string
  email: string
  password: string
  phoneNumber: string
}) => {
  const body = { fullName, email, password, phoneNumber }
  return axiosClient
    .post('/api/auth/register', body)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const loginAPI = ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const body = { email, password }
  return axiosClient
    .post('/api/auth/login', body)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getCurrentUserAPI = () => {
  const token = localStorage.getItem('token')
  return axiosClient
    .get('/api/auth/user/me', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const addAddressUserAPI = ({
  fullName,
  phoneNumber,
  address,
  district,
  city,
  country
}: {
  fullName: string
  phoneNumber: string
  address: string
  district: string
  city: string
  country: string
}) => {
  const token = localStorage.getItem('token')
  const body = { fullName, phoneNumber, address, district, city, country }
  return axiosClient
    .post('/api/auth/address/add', body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .then((err) => err)
}

export const getAddressUserAPI = () => {
  const token = localStorage.getItem('token')
  return axiosClient
    .get('/api/auth/address/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .then((err) => err)
}

export const deleteSelectedAddressAPI = (addressID: number) => {
  const token = localStorage.getItem('token')
  return axiosClient
    .delete(`/api/auth/address/delete/${addressID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .then((err) => err)
}
