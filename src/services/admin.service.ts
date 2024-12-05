import axiosClient from './api.service'

export const editProductAPI = ({
  id,
  name,
  image,
  price,
  color,
  category,
  brand,
  specifications,
  percent,
  imagePreview
}: {
  id: number
  name?: string
  image?: string
  price?: number
  color?: string
  category?: string
  brand?: string
  specifications?: { key: string; value: string }[]
  percent?: number
  imagePreview?: string[]
}) => {
  const token = localStorage.getItem('token')
  const body = {
    name,
    image,
    price,
    color,
    category,
    brand,
    specifications,
    percent,
    imagePreview
  }
  return axiosClient
    .put(`/api/product/edit/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const addProductAPI = ({
  name,
  image,
  price,
  color,
  category,
  brand,
  specifications,
  percent,
  imagePreview
}: {
  name: string
  image: string
  price: number
  color: string
  category: string
  brand: string
  specifications: { key: string; value: string }[]
  percent?: number
  imagePreview?: string[]
}) => {
  const body = {
    name,
    image,
    price,
    color,
    category,
    brand,
    specifications,
    percent,
    imagePreview
  }
  const token = localStorage.getItem('token')
  return axiosClient
    .post('/api/product/add', body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const addBlogPost = ({
  title,
  author,
  readTime,
  tags,
  content,
  image
}: {
  title: string
  author: string
  readTime: string
  tags: string
  content: string
  image: string
}) => {
  const token = localStorage.getItem('token')
  const body = { title, author, readTime, tags, content, image }
  return axiosClient
    .post('api/blog/add', body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}
