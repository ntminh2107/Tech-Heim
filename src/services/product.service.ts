import axiosClient from './api.service'

export const getProductByCatAPI = ({
  category,
  query
}: {
  category: string
  query: { [key: string]: string }
}) => {
  return axiosClient
    .get(`/api/product/category/${category}`, { params: query })
    .then((res) => {
      console.log()
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getProductByBrandAPI = (brand: string) => {
  return axiosClient
    .get(`/api/product/brand/${brand}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getSpecFilterAPI = (category: string) => {
  return axiosClient
    .get(`/api/product/spec/${category}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getProductDetailAPI = (productID: number) => {
  return axiosClient
    .get(`/api/product/detail/${productID}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getNewProductsAPI = () => {
  return axiosClient
    .get(`/api/product?page=1&pageSize=10&sortOrder=asc&search=`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getBestSellerProductsAPI = () => {
  return axiosClient
    .get(`/api/product?page=1&pageSize=10&sortOrder=asc&search=`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const checkHealth = () => {
  return axiosClient.get(`healthcheck`).then((res) => {
    console.log(res)
  })
}

checkHealth()

export const getSearchProductsAPI = (search: string) => {
  return axiosClient
    .get(`/api/product/search-product?search=${search}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getSaleProductsAPI = () => {
  return axiosClient
    .get('/api/product/sale?limit=10')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getBrandListAPI = () => {
  return axiosClient
    .get('/api/product/brand-list')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getCategoriesListAPI = () => {
  return axiosClient
    .get('/api/product/category-list')
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
  return axiosClient
    .post('/api/product/add', body)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const addCommentProductAPI = ({
  productID,
  content,
  rating
}: {
  productID: number
  content: string
  rating: number
}) => {
  const token = localStorage.getItem('token')
  const body = { content, rating, productID }
  return axiosClient
    .post(`/api/product/comment/add`, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getCommentAPI = (productID: number) => {
  return axiosClient
    .get(`/api/product/comment/list/${productID}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}
