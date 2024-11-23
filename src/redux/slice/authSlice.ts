import { createAppSlice } from '../appSlice'

import { setModalState } from './modalSlice'
import {
  addAddressUserAPI,
  getAddressUserAPI,
  getCurrentUserAPI,
  loginAPI,
  registerAPI
} from '../../services/auth.service'
import { Address, User } from '../../types/User'
import { getCartThunk } from './cartSlice'

interface AuthState {
  isLoggedIn: boolean
  token: string | null
  currentUser: User | null
  address: Address | null
  addressList: Address[]
  loading: boolean
}

const initialState: AuthState = {
  currentUser: null,
  token: null,
  address: null,
  loading: true,
  addressList: [],
  isLoggedIn: false
}

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    logoutAction: create.reducer(() => {
      localStorage.removeItem('token')
      return initialState
    }),
    registerThunk: create.asyncThunk(
      async (
        {
          fullName,
          email,
          password,
          phoneNumber
        }: {
          fullName: string
          email: string
          password: string
          phoneNumber: string
        },
        { dispatch }
      ) => {
        const res = await registerAPI({
          fullName,
          email,
          password,
          phoneNumber
        })
        if (res.status === 201) {
          localStorage.setItem('token', res.data)
          dispatch(
            setModalState({
              key: 'successModal',
              isOpen: true
            })
          )
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
          console.log('data: ', data)
          return {
            ...state,
            loading: false,
            isLoggedIn: true,
            token: data,
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
    loginThunk: create.asyncThunk(
      async (
        { email, password }: { email: string; password: string },
        { dispatch }
      ) => {
        const res = await loginAPI({ email, password })
        if (res.status === 202) {
          localStorage.setItem('token', res.data)
          dispatch(getUserDetailThunk())
          dispatch(getCartThunk())
          dispatch(setModalState({ key: 'successModal', isOpen: true }))
        }
        if (res.status === 401) {
          dispatch(setModalState({ key: 'errorModal', isOpen: true }))
          localStorage.removeItem('token')
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
            isLoggedIn: true,
            token: data,
            status: status
          }
        }
      }
    ),
    getUserDetailThunk: create.asyncThunk(
      async () => {
        const res = await getCurrentUserAPI()
        if (res.status === 401) {
          localStorage.removeItem('token')
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
            currentUser: data,
            isLoggedIn: true,
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
    getAddressListThunk: create.asyncThunk(getAddressUserAPI, {
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
          addressList: data,
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
    addAddressThunk: create.asyncThunk(
      async ({
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
        const res = await addAddressUserAPI({
          fullName,
          phoneNumber,
          address,
          district,
          city,
          country
        })
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
            address: data,
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
  logoutAction,
  registerThunk,
  loginThunk,
  getUserDetailThunk,
  addAddressThunk,
  getAddressListThunk
} = authSlice.actions
export default authSlice.reducer
