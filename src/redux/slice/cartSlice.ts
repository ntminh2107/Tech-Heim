import {
  addToCartAPI,
  deleteCartAPI,
  deleteCartItemAPI,
  getCartAPI,
  updateQuantityAPI
} from '../../services/cart.service'
import { Cart, CartItem } from '../../types/Cart'
import { createAppSlice } from '../appSlice'

interface CartState {
  loading: boolean
  cart: Cart | null
  cartItem: CartItem | null
  cartItems: CartItem[]
  message: string | null
}
const initialState: CartState = {
  loading: true,
  cart: null,
  cartItem: null,
  cartItems: [],
  message: null
}

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    getCartThunk: create.asyncThunk(getCartAPI, {
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
          cart: data,
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
    addToCartThunk: create.asyncThunk(
      async (productID: number, { dispatch }) => {
        const res = await addToCartAPI(productID)
        if (res.status === 202) {
          dispatch(getCartThunk())
        }
        return res
      },
      {
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
            message: data,
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

    deleteCartThunk: create.asyncThunk(deleteCartAPI, {
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
          message: data,
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
    deleteCartItemThunk: create.asyncThunk(
      async (cartItemID: number, { dispatch }) => {
        const res = await deleteCartItemAPI(cartItemID)
        if (res.status === 202) {
          dispatch(getCartThunk())
        }
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
            message: data,
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
    updateQuantityThunk: create.asyncThunk(
      async (
        {
          cartItemID,
          quantity
        }: {
          cartItemID: number
          quantity: number
        },
        { dispatch }
      ) => {
        const res = await updateQuantityAPI({ cartItemID, quantity })
        if (res.status === 202) {
          dispatch(getCartThunk())
        }
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
            message: data,
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
  addToCartThunk,
  getCartThunk,
  deleteCartThunk,
  deleteCartItemThunk,
  updateQuantityThunk
} = cartSlice.actions
export default cartSlice.reducer
