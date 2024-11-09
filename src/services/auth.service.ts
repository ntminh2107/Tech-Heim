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
  name,
  address,
  district,
  city,
  country
}: {
  name: string
  address: string
  district: string
  city: string
  country: string
}) => {
  const token = localStorage.getItem('token')
  const body = { name, address, district, city, country }
  return axiosClient
    .post('/api/address/add', body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .then((err) => err)
}
