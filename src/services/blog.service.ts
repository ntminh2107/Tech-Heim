import axiosClient from './api.service'

export const getListBlogAPI = () => {
  return axiosClient
    .get('/api/blog/list')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getListNewBlogsAPI = () => {
  return axiosClient
    .get('/api/blog/list?limit=4')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getBlogDetailAPI = (blogID: number) => {
  return axiosClient
    .get(`/api/blog/${blogID}`)
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}

export const getListVideoBlogAPI = () => {
  return axiosClient
    .get('/api/blog/video')
    .then((res) => {
      const { data, status } = res
      return { data, status }
    })
    .catch((err) => err)
}
