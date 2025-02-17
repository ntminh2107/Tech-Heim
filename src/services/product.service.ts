import axiosClient from './api.service'

export const getProductByCatAPI = ({
  category,
  query
}: {
  category: string
  query: { [key: string]: string }
}) => {
  return axiosClient
    .get(`product/category/${category}`, { params: query })
    .then((res) => {
      console.log()
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getProductByBrandAPI = (brand: string) => {
  return axiosClient
    .get(`product/brand/${brand}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getSpecFilterAPI = (category: string) => {
  return axiosClient
    .get(`product/spec/${category}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getProductDetailAPI = (productID: number) => {
  return axiosClient
    .get(`product/detail/${productID}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getNewProductsAPI = () => {
  return axiosClient
    .get(`product?limit=10`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getBestSellerProductsAPI = () => {
  return axiosClient
    .get(`product?limit=10`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getSearchProductsAPI = (search: string) => {
  return axiosClient
    .get(`product/search-product?search=${search}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getSaleProductsAPI = () => {
  return axiosClient
    .get('product/sale?limit=10')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getBrandListAPI = () => {
  return axiosClient
    .get('product/brand-list')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getCategoriesListAPI = () => {
  return axiosClient
    .get('/product/category-list')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}
