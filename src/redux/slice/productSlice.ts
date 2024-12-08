import {
  addCommentProductAPI,
  getBestSellerProductsAPI,
  getBrandListAPI,
  getCategoriesListAPI,
  getCommentAPI,
  getNewProductsAPI,
  getProductByCatAPI,
  getProductDetailAPI,
  getSaleProductsAPI,
  getSearchProductsAPI,
  getSpecFilterAPI
} from '../../services/product.service'
import { Comments } from '../../types/Comment'
import {
  Brand,
  Category,
  Product,
  ProductList,
  SpecFilter
} from '../../types/Product'
import { createAppSlice } from '../appSlice'

interface ProductState {
  loading: boolean
  listBrand: Brand[]
  listProducts: Product[]
  listNewProducts: ProductList
  listBestSellerProducts: ProductList
  listSearchProducts: Product[]
  listSaleProducts: Product[]
  listCategory: Category[]
  product: Product | null
  specFilter: SpecFilter[]
  comment: Comments | null
  commentList: Comments[]
}

const initialState: ProductState = {
  loading: true,
  listBrand: [],
  listProducts: [],
  product: null,
  specFilter: [],
  listNewProducts: null,
  listSearchProducts: [],
  listBestSellerProducts: null,
  listSaleProducts: [],
  listCategory: [],
  comment: null,
  commentList: []
}

export const listProductslice = createAppSlice({
  name: 'product',
  initialState,
  reducers: (create) => ({
    getBrandListThunk: create.asyncThunk(getBrandListAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: false
        }
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload
        return {
          ...state,
          loading: false,
          listBrand: data,
          status: status
        }
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false
        }
      }
    }),
    getFilterProductListThunk: create.asyncThunk(
      async ({
        category,
        query
      }: {
        category: string
        query: { [key: string]: string }
      }) => {
        const res = await getProductByCatAPI({ category, query })
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            loading: false,
            listProducts: data,
            status: status
          }
        }
      }
    ),

    getProductDetailThunk: create.asyncThunk(
      async (productID: number) => {
        const res = await getProductDetailAPI(productID)
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            loading: false,
            product: data,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    ),
    getSpecFilterListThunk: create.asyncThunk(
      async (category: string) => {
        const res = await getSpecFilterAPI(category)
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            specFilter: data,
            loading: false,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    ),
    getNewProductsListThunk: create.asyncThunk(getNewProductsAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: true
        }
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload
        return {
          ...state,
          loading: false,
          listNewProducts: data,
          status: status
        }
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false
        }
      }
    }),
    getBestSellerProductListThunk: create.asyncThunk(getBestSellerProductsAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: true
        }
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload
        return {
          ...state,
          loading: false,
          listBestSellerProducts: data,
          status: status
        }
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false
        }
      }
    }),
    getSearchedProductListThunk: create.asyncThunk(
      async (search: string) => {
        const res = await getSearchProductsAPI(search)
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            loading: false,
            listSearchProducts: data,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    ),
    getSaleProductListThunk: create.asyncThunk(getSaleProductsAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: true
        }
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload
        return {
          ...state,
          loading: false,
          listSaleProducts: data,
          status: status
        }
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false
        }
      }
    }),
    getCategoriesListThunk: create.asyncThunk(getCategoriesListAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: true
        }
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload
        return {
          ...state,
          loading: false,
          listCategory: data,
          status: status
        }
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false
        }
      }
    }),
    addCommentProductThunk: create.asyncThunk(
      async ({
        productID,
        content,
        rating
      }: {
        productID: number
        content: string
        rating: number
      }) => {
        const res = await addCommentProductAPI({ productID, content, rating })
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            loading: false,
            comment: data,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    ),
    getCommentListThunk: create.asyncThunk(
      async (productID: number) => {
        const res = await getCommentAPI(productID)
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            loading: false,
            commentList: data,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    )
  })
})

export const {
  getFilterProductListThunk,
  getSaleProductListThunk,
  getProductDetailThunk,
  getSpecFilterListThunk,
  getNewProductsListThunk,
  getBestSellerProductListThunk,
  getSearchedProductListThunk,
  getBrandListThunk,
  getCategoriesListThunk,
  addCommentProductThunk,
  getCommentListThunk
} = listProductslice.actions

export default listProductslice.reducer
